// Resolve Identity — DID → document, or handle → DNS + HTTP resolution.
import { getAtprotoHandle, isAtprotoDid, type DidDocument } from "@atcute/identity";
import { isHandle, type Handle } from "@atcute/lexicons/syntax";
import { didDocumentResolver, dnsResolver, httpResolver, normalizeQuery } from "./lib/resolvers.js";
import { buildItem, infoItem, output, writeQuickLook, type AlfredItem } from "./lib/alfred.js";
import { renderDidDocMarkdown } from "./lib/render.js";

type AtprotoDid = Parameters<typeof didDocumentResolver.resolve>[0];

async function resolveDid(did: AtprotoDid): Promise<AlfredItem[]> {
  const doc = (await didDocumentResolver.resolve(did)) as DidDocument;
  const handle = getAtprotoHandle(doc) ?? null;
  const docJson = JSON.stringify(doc, null, 2);
  const quicklook = writeQuickLook(`resolve-${did}`, renderDidDocMarkdown(did, handle, doc));

  const items: AlfredItem[] = [
    buildItem({
      uid: did,
      title: handle ? `@${handle}` : did,
      subtitle: handle ? did : "DID document",
      open: `https://pdsls.dev/at://${did}#identity`,
      copyCmd: { value: did, label: "Copy DID" },
      copyAlt: { value: docJson, label: "Copy DID document JSON" },
      quicklook,
    }),
  ];

  for (const aka of doc.alsoKnownAs ?? []) {
    items.push(
      buildItem({
        title: aka,
        subtitle: "Also Known As",
        copyCmd: { value: aka, label: "Copy value" },
      }),
    );
  }
  for (const svc of doc.service ?? []) {
    const type = Array.isArray(svc.type) ? svc.type[0] : svc.type;
    const endpoint = typeof svc.serviceEndpoint === "string" ? svc.serviceEndpoint : JSON.stringify(svc.serviceEndpoint);
    items.push(
      buildItem({
        title: endpoint,
        subtitle: `Service · ${type}`,
        open: typeof svc.serviceEndpoint === "string" ? svc.serviceEndpoint : undefined,
        copyCmd: { value: endpoint, label: "Copy endpoint" },
      }),
    );
  }
  for (const vm of doc.verificationMethod ?? []) {
    items.push(
      buildItem({
        title: vm.publicKeyMultibase ?? vm.id,
        subtitle: `Verification Method · ${vm.id.replace(did, "")}`,
        copyCmd: { value: vm.publicKeyMultibase ?? vm.id, label: "Copy key" },
      }),
    );
  }
  return items;
}

interface Resolution {
  success: boolean;
  did?: string;
  error?: string;
}

async function resolveHandle(handle: string): Promise<AlfredItem[]> {
  const [dnsSettled, httpSettled] = await Promise.allSettled([
    dnsResolver.resolve(handle as Handle),
    httpResolver.resolve(handle as Handle),
  ]);

  const dns: Resolution =
    dnsSettled.status === "fulfilled"
      ? { success: true, did: dnsSettled.value }
      : { success: false, error: dnsSettled.reason?.message ?? "Failed" };
  const http: Resolution =
    httpSettled.status === "fulfilled"
      ? { success: true, did: httpSettled.value }
      : { success: false, error: httpSettled.reason?.message ?? "Failed" };

  const resolvedDid = dns.did ?? http.did;
  const match = dns.success && http.success ? dns.did === http.did : null;

  const items: AlfredItem[] = [
    buildItem({
      uid: handle,
      title: `@${handle}`,
      subtitle: resolvedDid ? `Resolves to ${resolvedDid}` : "Could not resolve handle",
      open: resolvedDid ? `https://pdsls.dev/at://${resolvedDid}` : undefined,
      copyCmd: resolvedDid ? { value: resolvedDid, label: "Copy DID" } : undefined,
    }),
    buildItem({
      title: dns.success ? dns.did! : dns.error!,
      subtitle: `DNS (_atproto TXT) · ${dns.success ? "OK" : "Failed"}`,
      copyCmd: dns.success ? { value: dns.did!, label: "Copy DID (DNS)" } : undefined,
    }),
    buildItem({
      title: http.success ? http.did! : http.error!,
      subtitle: `HTTP (.well-known) · ${http.success ? "OK" : "Failed"}`,
      copyCmd: http.success ? { value: http.did!, label: "Copy DID (HTTP)" } : undefined,
    }),
  ];

  if (match !== null) {
    items.push(
      infoItem(
        match ? "DNS and HTTP match" : "DNS and HTTP mismatch!",
        match ? "Validation: Valid" : "Validation: Warning",
      ),
    );
  }
  return items;
}

async function main(): Promise<void> {
  const query = normalizeQuery(process.argv[2] ?? "");
  if (!query) {
    output([infoItem("Resolve Identity", "Enter a DID (did:plc:…) or handle (user.bsky.social)")]);
    return;
  }

  if (isAtprotoDid(query)) {
    output(await resolveDid(query));
  } else if (isHandle(query)) {
    output(await resolveHandle(query));
  } else {
    output([infoItem("Invalid input", "Enter a valid DID or handle")]);
  }
}

main().catch((err) => output([infoItem("Resolution failed", err?.message ?? String(err))]));
