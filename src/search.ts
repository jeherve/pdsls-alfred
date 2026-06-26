// Search Users — typeahead profile search, open in pds.ls.
import { buildItem, infoItem, output } from "./lib/alfred.js";

interface Actor {
  did: string;
  handle: string;
  displayName?: string;
  avatar?: string;
}

async function main(): Promise<void> {
  const query = (process.argv[2] ?? "").trim();
  if (!query) {
    output([infoItem("Search for a profile", "Type a handle or name to search Bluesky")]);
    return;
  }

  const url = `https://public.api.bsky.app/xrpc/app.bsky.actor.searchActorsTypeahead?q=${encodeURIComponent(query)}&limit=10`;
  const res = await fetch(url);
  const json = (await res.json()) as { actors?: Actor[] } & { error?: string; message?: string };

  if (!res.ok || json.error) {
    output([infoItem("Search failed", json.message ?? res.statusText)]);
    return;
  }

  const actors = json.actors ?? [];
  if (actors.length === 0) {
    output([infoItem("No results", `No profiles matching "${query}"`)]);
    return;
  }

  output(
    actors.map((actor) =>
      buildItem({
        uid: actor.did,
        title: actor.displayName || actor.handle,
        subtitle: actor.displayName ? `@${actor.handle}` : actor.did,
        open: `https://pds.ls/at://${actor.did}`,
        copyCmd: { value: actor.did, label: "Copy DID" },
        copyAlt: { value: actor.handle, label: "Copy handle" },
      }),
    ),
  );
}

main().catch((err) => output([infoItem("Error", err?.message ?? String(err))]));
