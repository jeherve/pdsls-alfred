// Bundle each command into a self-contained CJS file under workflow/dist,
// and regenerate workflow/info.plist from its editable JSON source.
import esbuild from "esbuild";
import { mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";

mkdirSync("workflow/dist", { recursive: true });

// info.json is the editable source of truth; plutil renders the plist Alfred reads.
execFileSync("plutil", ["-convert", "xml1", "-o", "workflow/info.plist", "workflow/info.json"]);

await esbuild.build({
  entryPoints: ["src/search.ts", "src/resolve.ts", "src/plc.ts", "src/lexicon.ts"],
  outdir: "workflow/dist",
  bundle: true,
  platform: "node",
  target: "node20",
  format: "cjs",
  outExtension: { ".js": ".cjs" },
  legalComments: "none",
  logLevel: "info",
});

console.log("Built workflow/info.plist + workflow/dist/{search,resolve,plc,lexicon}.cjs");
