// View Lexicon — resolve an NSID's schema and render it.
import { isAtprotoDid } from "@atcute/identity";
import { isNsid } from "@atcute/lexicons/syntax";
import { LexiconSchemaResolver } from "@atcute/lexicon-resolver";
import { NodeDnsLexiconAuthorityResolver } from "@atcute/lexicon-resolver-node";
import { didDocumentResolver } from "./lib/resolvers.js";
import { renderSchema, defSummary, type LexiconSchema } from "./lib/render.js";
import { buildItem, infoItem, output, writeQuickLook, type AlfredItem } from "./lib/alfred.js";

const lexiconAuthorityResolver = new NodeDnsLexiconAuthorityResolver();
const schemaResolver = new LexiconSchemaResolver({ didDocumentResolver });

async function main(): Promise<void> {
  const nsid = (process.argv[2] ?? "").trim();
  if (!nsid) {
    output([infoItem("View Lexicon", "Enter an NSID, e.g. app.bsky.feed.post")]);
    return;
  }
  if (!isNsid(nsid)) {
    output([infoItem("Invalid NSID", `"${nsid}" is not a valid lexicon NSID`)]);
    return;
  }

  const authority = await lexiconAuthorityResolver.resolve(nsid);
  if (!isAtprotoDid(authority)) {
    output([infoItem("Resolution failed", "Could not resolve lexicon authority DID")]);
    return;
  }

  const result = await schemaResolver.resolve(authority, nsid);
  const schema = result.schema as unknown as LexiconSchema;

  const markdown = renderSchema(schema);
  const json = JSON.stringify(schema, null, 2);
  const quicklook = writeQuickLook(`lexicon-${nsid}`, markdown);
  const pdslsUrl = `https://pds.ls/at://${authority}/com.atproto.lexicon.schema/${nsid}#schema`;

  const items: AlfredItem[] = [
    buildItem({
      uid: nsid,
      title: schema.id,
      subtitle: `Lexicon v${schema.lexicon}${schema.description ? ` · ${schema.description}` : ""}`,
      open: pdslsUrl,
      copyCmd: { value: json, label: "Copy schema JSON" },
      copyAlt: { value: markdown, label: "Copy markdown" },
      quicklook,
    }),
  ];

  for (const [name, def] of Object.entries(schema.defs)) {
    items.push(
      buildItem({
        title: `${name === "main" ? "main" : name} (${def.type})`,
        subtitle: defSummary(name, def),
        open: pdslsUrl,
        copyCmd: { value: JSON.stringify(def, null, 2), label: "Copy def JSON" },
        quicklook,
      }),
    );
  }

  output(items);
}

main().catch((err) => output([infoItem("Lexicon load failed", err?.message ?? String(err))]));
