# PDSLS Alfred Workflow — Design

Port of the [PDSls Raycast extension](https://github.com/raycast/extensions/tree/186d955eda64f9e956b25a3fdf5566b1d38f57f2/extensions/pdsls/)
to an Alfred workflow, with full feature parity. Integrates with [pdsls.dev](https://pdsls.dev)
to inspect AT Protocol data.

## Goal

Provide the same four utilities the Raycast extension offers, as Alfred Script Filters:

| Keyword       | Command            | Source command           |
| ------------- | ------------------ | ------------------------ |
| `pdsearch {q}`| Search Users       | `search-users.tsx`       |
| `pdresolve {q}`| Resolve Identity  | `resolve-identity.tsx`   |
| `pdplc {q}`   | PLC Operation Log  | `plc-operation-log.tsx`  |
| `pdlex {nsid}`| View Lexicon       | `view-lexicon.tsx`       |

## Decisions (from brainstorming)

- **Scope:** all four commands, full parity.
- **Detail UX:** Alfred has no inline rich pane. Detail-heavy views are broken into Alfred
  list rows (one row per PLC operation, per lexicon def, per DID-document field). The full
  lexicon markdown (and per-row detail) is available via Alfred's **Quick Look** (⇧), pointed
  at a temporary HTML file rendered from the same data.
- **Runtime:** TypeScript bundled with **esbuild** into self-contained CJS, one file per
  command, no `node_modules` shipped. Reuses the exact `@atcute/*` resolution / PLC / lexicon
  logic from Raycast (same pinned versions) for true parity. Requires Node on PATH at runtime.

## Behavior parity

### Search Users (`pdsearch`)
- Calls `https://public.api.bsky.app/xrpc/app.bsky.actor.searchActorsTypeahead?q=…&limit=10`.
- Rows: avatar icon, `displayName` (title) / `@handle` (subtitle), one per actor.
- Actions: ⏎ open `https://pdsls.dev/at://{did}`; ⌘ copy DID; ⌥ copy handle.

### Resolve Identity (`pdresolve`)
- DID input → resolve DID document (PLC + web composite resolver), extract handle.
  Rows: the DID/handle summary plus one row per `alsoKnownAs`, service, verification method.
  Actions: ⏎ open `…#identity`; ⌘ copy DID; ⌥ copy DID document JSON.
- Handle input → resolve via DNS (`_atproto` TXT) **and** HTTP (`.well-known/atproto-did`)
  in parallel; show each result, success/failure, and whether they match.
  Actions: ⏎ open pdsls for the resolved DID; ⌘ copy DID.
- A leading `@` is stripped from the query (parity with Raycast).

### PLC Operation Log (`pdplc`)
- Resolve query → DID (must be `did:plc:`). Fetch `https://plc.directory/{did}/log/audit`,
  parse with `defs.indexedEntryLog`, build diff history via ported `plc-logs.ts`, group by
  operation, newest first.
- Rows: one per operation — date (title), diff summary + "Nullified" tag (subtitle/accessory).
  Actions: ⏎ open `…#logs`; ⌘ copy operation JSON; ⇧ Quick Look the rendered diff detail.

### View Lexicon (`pdlex`)
- Resolve NSID authority via `_lexicon` DNS, resolve schema, render markdown (ported from
  Raycast's renderer).
- Rows: one per def (title `name (type)`, subtitle key/description) plus a top summary row.
  Actions: ⏎ open `https://pdsls.dev/at://{authority}/com.atproto.lexicon.schema/{nsid}#schema`;
  ⌘ copy schema JSON; ⌥ copy markdown; ⇧ Quick Look the full rendered markdown (as HTML).

## Architecture

```
pdsls-alfred/
  src/
    search.ts  resolve.ts  plc.ts  lexicon.ts   ← one entry per command
    lib/
      resolvers.ts   ← composite DID/handle/lexicon resolvers (single shared instance)
      alfred.ts      ← typed Script Filter JSON output + error-item helper
      plc-logs.ts    ← ported verbatim from Raycast utils
      render.ts      ← markdown + HTML rendering for rows and Quick Look
  workflow/          ← the importable Alfred bundle
    info.plist       (4 script filters + shared Open URL / Copy dispatcher, wired)
    dist/*.js        (esbuild output, committed so the workflow runs on import)
    icon.png
  build.mjs          (esbuild config)
  test/              (node:test unit tests + fixtures)
  package.json  tsconfig.json  README.md
```

- **Each command script** reads `process.argv[2]` (the Alfred query), does its async work,
  and prints `{"items":[…]}` to stdout. Any thrown error is caught and rendered as a single
  non-actionable Alfred row — the script never exits non-zero, so Alfred always shows a result.
- **Action routing:** items carry `arg` + Alfred variables (`pdsls_action` = `open`/`copy`,
  `pdsls_value`). Each Script Filter connects (per modifier: none, ⌘, ⌥) to a single Run Script
  "dispatcher" that runs `open "$value"` or `pbcopy`. Quick Look (⇧) is native via `quicklookurl`.
- **Quick Look files** are written to `$alfred_workflow_cache` (or a temp dir) as HTML during
  list build; modest result sizes make this cheap.

## Testing

- `node:test` unit tests for the pure logic:
  - PLC diff computation against a captured `log/audit` fixture (created / handle change /
    rotation key / service / tombstone cases).
  - Lexicon → markdown rendering against a captured schema fixture.
  - Alfred-JSON shaping (item builder, error item, mods).
- Integration smoke checks (network) against a known stable DID (`did:plc:` for `bsky.app`)
  guarded so they can be skipped offline.
- Manual verification: import `PDSLS.alfredworkflow`, run each keyword.

## Out of scope

- Bluesky auth / private data (the Raycast extension is read-only public data too).
- Anything beyond the four commands.
