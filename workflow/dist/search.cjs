"use strict";

// src/lib/alfred.ts
var ICON = "icon.png";
function buildItem(opts) {
  const item = {
    uid: opts.uid,
    title: opts.title,
    subtitle: opts.subtitle,
    icon: { path: opts.iconPath ?? ICON }
  };
  if (opts.open) {
    item.valid = true;
    item.arg = opts.open;
    item.variables = { pdsls_action: "open", pdsls_value: opts.open };
  } else {
    item.valid = false;
  }
  const mods = {};
  if (opts.copyCmd) {
    mods.cmd = {
      valid: true,
      arg: opts.copyCmd.value,
      subtitle: opts.copyCmd.label,
      variables: { pdsls_action: "copy", pdsls_value: opts.copyCmd.value }
    };
  }
  if (opts.copyAlt) {
    mods.alt = {
      valid: true,
      arg: opts.copyAlt.value,
      subtitle: opts.copyAlt.label,
      variables: { pdsls_action: "copy", pdsls_value: opts.copyAlt.value }
    };
  }
  if (Object.keys(mods).length > 0) item.mods = mods;
  if (opts.quicklook) item.quicklookurl = opts.quicklook;
  if (opts.copyCmd) item.text = { copy: opts.copyCmd.value };
  return item;
}
function infoItem(title, subtitle) {
  return { title, subtitle, valid: false, icon: { path: ICON } };
}
function output(items) {
  process.stdout.write(JSON.stringify({ items }));
}

// src/search.ts
async function main() {
  const query = (process.argv[2] ?? "").trim();
  if (!query) {
    output([infoItem("Search for a profile", "Type a handle or name to search Bluesky")]);
    return;
  }
  const url = `https://public.api.bsky.app/xrpc/app.bsky.actor.searchActorsTypeahead?q=${encodeURIComponent(query)}&limit=10`;
  const res = await fetch(url);
  const json = await res.json();
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
    actors.map(
      (actor) => buildItem({
        uid: actor.did,
        title: actor.displayName || actor.handle,
        subtitle: actor.displayName ? `@${actor.handle}` : actor.did,
        open: `https://pds.ls/at://${actor.did}`,
        copyCmd: { value: actor.did, label: "Copy DID" },
        copyAlt: { value: actor.handle, label: "Copy handle" }
      })
    )
  );
}
main().catch((err) => output([infoItem("Error", err?.message ?? String(err))]));
