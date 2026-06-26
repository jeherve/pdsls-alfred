// PLC Operation Log — fetch and render a did:plc identity's audit history.
import { defs, type IndexedEntry, type CompatibleOperationOrTombstone } from "@atcute/did-plc";
import { resolveToDid, normalizeQuery } from "./lib/resolvers.js";
import { createOperationHistory, groupBy, type DiffEntry } from "./lib/plc-logs.js";
import { renderPlcOpMarkdown, diffSummary } from "./lib/render.js";
import { buildItem, infoItem, output } from "./lib/alfred.js";
import { writeQuickLook } from "./lib/alfred.js";

const PLC_DIRECTORY = "https://plc.directory";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function main(): Promise<void> {
  const query = normalizeQuery(process.argv[2] ?? "");
  if (!query) {
    output([infoItem("PLC Operation Log", "Enter a DID or handle to view operation history")]);
    return;
  }

  const did = await resolveToDid(query);
  if (!did) {
    output([infoItem("Not found", "Could not resolve identity")]);
    return;
  }
  if (!did.startsWith("did:plc:")) {
    output([infoItem("No operation log", "Only did:plc identities have an operation log")]);
    return;
  }

  const res = await fetch(`${PLC_DIRECTORY}/${did}/log/audit`);
  if (!res.ok) {
    output([infoItem("Fetch failed", `plc.directory returned ${res.status}`)]);
    return;
  }

  const logs = defs.indexedEntryLog.parse(await res.json());
  const opHistory = createOperationHistory(logs).reverse();
  const operations = Array.from(groupBy(opHistory, (item: DiffEntry) => item.orig)) as [
    IndexedEntry<CompatibleOperationOrTombstone>,
    DiffEntry[],
  ][];

  if (operations.length === 0) {
    output([infoItem("No operations", `No operations found for ${did}`)]);
    return;
  }

  const items = operations.map(([entry, diffs]) => {
    const date = formatDate(entry.createdAt);
    const quicklook = writeQuickLook(`plc-${entry.cid}`, renderPlcOpMarkdown(date, entry.cid, diffs));
    return buildItem({
      uid: entry.cid,
      title: date,
      subtitle: `${entry.nullified ? "[Nullified] " : ""}${diffSummary(diffs)}`,
      open: `https://pds.ls/at://${did}#logs`,
      copyCmd: { value: JSON.stringify(entry, null, 2), label: "Copy operation JSON" },
      quicklook,
    });
  });

  output(items);
}

main().catch((err) => output([infoItem("Error", err?.message ?? String(err))]));
