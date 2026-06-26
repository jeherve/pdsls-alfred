# PDSls for Alfred

[AT Protocol](https://atproto.com) utilities for [Alfred](https://www.alfredapp.com/), integrating
with [pdsls.dev](https://pdsls.dev) to inspect data on the network. An Alfred port of the
[PDSls Raycast extension](https://github.com/raycast/extensions/tree/main/extensions/pdsls), reusing
the same `@atcute/*` resolution libraries for parity.

## Commands

| Keyword            | Description                                                       |
| ------------------ | ---------------------------------------------------------------- |
| `pdsearch {query}` | Search for a Bluesky profile and open it in PDSls                |
| `pdresolve {query}`| Resolve a DID to a handle or vice versa (DNS + HTTP)             |
| `pdplc {query}`    | View the PLC operation log for a `did:plc` (DID or handle input) |
| `pdlex {nsid}`     | View a lexicon schema, e.g. `app.bsky.feed.post`                 |

### Actions on any result

- **⏎** — open the relevant `pdsls.dev` page in your browser
- **⌘** — copy the DID / operation JSON / schema JSON
- **⌥** — copy the secondary value (handle / markdown), where available
- **⇧** — Quick Look the rendered detail (DID document, PLC diff, or full lexicon)

## Requirements

- Alfred 5 with the **Powerpack** (workflows).
- **Node.js** on your `PATH`. The workflow auto-detects Homebrew (`/opt/homebrew/bin`,
  `/usr/local/bin`) and nvm installs.

## Install

Download `PDSLS.alfredworkflow` (or build it — see below) and double-click to import into Alfred.

## Develop

```bash
npm install        # install dependencies
npm run typecheck  # tsc --noEmit
npm test           # bundle + run node:test suite
npm run build      # esbuild → workflow/dist/*.cjs (committed)
npm run package    # build + zip workflow/ → PDSLS.alfredworkflow
```

### Layout

```
src/                 TypeScript sources (one entry per command + shared lib/)
workflow/            the importable Alfred bundle
  info.plist         4 script filters + a shared open/copy dispatcher
  dist/*.cjs         bundled commands (committed so the workflow runs on import)
  icon.png
test/                node:test unit tests + fixtures
docs/superpowers/specs/  design spec
```

Each command reads the Alfred query from `argv`, prints Alfred Script Filter JSON to stdout, and
renders Quick Look detail to HTML in `$alfred_workflow_cache`. Errors surface as a single
non-actionable Alfred row rather than failing the script.

## Credits

Ports the PDSls Raycast extension by its original authors. Built on the
[`@atcute`](https://github.com/mary-ext/atcute) libraries. Powered by [pdsls.dev](https://pdsls.dev).
