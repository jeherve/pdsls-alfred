import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { defs } from "@atcute/did-plc";
import { createOperationHistory, groupBy, type DiffEntry } from "../src/lib/plc-logs.js";
import { renderSchema, diffSummary, diffLabel, renderPlcOpMarkdown, type LexiconSchema } from "../src/lib/render.js";
import { markdownToHtml, buildItem, infoItem } from "../src/lib/alfred.js";

const fixture = (name: string) => JSON.parse(readFileSync(join(process.cwd(), "test", "fixtures", name), "utf8"));

test("createOperationHistory derives the expected diff sequence from a real audit log", () => {
  const logs = defs.indexedEntryLog.parse(fixture("bsky-app-audit.json"));
  const history = createOperationHistory(logs);
  const types = history.map((d) => d.type);

  // First operation always establishes the identity.
  assert.equal(types[0], "identity_created");
  // The bsky.app identity renamed from bluesky-team.bsky.social to bsky.app.
  assert.ok(types.includes("handle_changed"), "expected a handle change");
  const handleChange = history.find((d) => d.type === "handle_changed");
  assert.ok(handleChange && "next_handle" in handleChange);
  assert.match((handleChange as Extract<DiffEntry, { type: "handle_changed" }>).next_handle, /bsky\.app/);
});

test("groupBy groups diffs by their originating operation", () => {
  const logs = defs.indexedEntryLog.parse(fixture("bsky-app-audit.json"));
  const history = createOperationHistory(logs);
  const groups = groupBy(history, (d) => d.orig);
  // Every diff is accounted for, and each group key is a distinct operation entry.
  const total = [...groups.values()].reduce((n, list) => n + list.length, 0);
  assert.equal(total, history.length);
  assert.ok(groups.size >= 1);
});

test("diffLabel and diffSummary produce readable summaries", () => {
  const created: DiffEntry = {
    type: "identity_created",
    orig: { nullified: false } as DiffEntry["orig"],
    at: "2023-01-01T00:00:00Z",
    rotationKeys: ["k1"],
    verificationMethods: { atproto: "vm" },
    alsoKnownAs: ["at://alice.test"],
    services: { atproto_pds: { type: "AtprotoPersonalDataServer", endpoint: "https://pds" } },
  };
  assert.equal(diffLabel(created), "Identity created");
  assert.equal(diffSummary([created]), "Identity created");
});

test("renderPlcOpMarkdown includes the operation metadata and diff detail", () => {
  const changed: DiffEntry = {
    type: "handle_changed",
    orig: { nullified: false } as DiffEntry["orig"],
    at: "2023-01-02T00:00:00Z",
    prev_handle: "at://old.test",
    next_handle: "at://new.test",
  };
  const md = renderPlcOpMarkdown("Jan 2, 2023", "bafycid", [changed]);
  assert.match(md, /# PLC Operation/);
  assert.match(md, /bafycid/);
  assert.match(md, /old\.test/);
  assert.match(md, /new\.test/);
});

test("renderSchema renders a lexicon schema to markdown", () => {
  const schema: LexiconSchema = {
    lexicon: 1,
    id: "com.example.thing",
    description: "An example.",
    defs: {
      main: {
        type: "record",
        key: "tid",
        record: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string", maxLength: 100 },
            count: { type: "integer", minimum: 0 },
          },
        },
      },
    },
  };
  const md = renderSchema(schema);
  assert.match(md, /# com\.example\.thing/);
  assert.match(md, /\*\*Lexicon Version:\*\* 1/);
  assert.match(md, /\*\*Record Key:\*\* `tid`/);
  assert.match(md, /\*\*name\*\* `string` \(maxLength: 100\) \*required\*/);
  assert.match(md, /\*\*count\*\*/);
});

test("markdownToHtml converts the subset we emit", () => {
  const html = markdownToHtml("# Title\n\n**bold** and `code`\n\n- item one\n- item two\n\n> a quote");
  assert.match(html, /<h1>Title<\/h1>/);
  assert.match(html, /<strong>bold<\/strong>/);
  assert.match(html, /<code>code<\/code>/);
  assert.match(html, /<ul>/);
  assert.match(html, /<li>item one<\/li>/);
  assert.match(html, /<blockquote>a quote<\/blockquote>/);
});

test("markdownToHtml escapes HTML special characters", () => {
  const html = markdownToHtml("a <script> & b");
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /&amp;/);
  assert.doesNotMatch(html, /<script>/);
});

test("buildItem wires open/copy actions and Quick Look", () => {
  const item = buildItem({
    title: "Bluesky",
    subtitle: "@bsky.app",
    open: "https://pdsls.dev/at://did:plc:abc",
    copyCmd: { value: "did:plc:abc", label: "Copy DID" },
    copyAlt: { value: "bsky.app", label: "Copy handle" },
    quicklook: "/tmp/x.html",
  });
  assert.equal(item.valid, true);
  assert.equal(item.arg, "https://pdsls.dev/at://did:plc:abc");
  assert.equal(item.variables?.pdsls_action, "open");
  assert.equal(item.mods?.cmd?.variables?.pdsls_value, "did:plc:abc");
  assert.equal(item.mods?.alt?.arg, "bsky.app");
  assert.equal(item.quicklookurl, "/tmp/x.html");
  assert.equal(item.text?.copy, "did:plc:abc");
});

test("buildItem with no open target is not actionable on Enter", () => {
  const item = buildItem({ title: "Field", subtitle: "info", copyCmd: { value: "v", label: "Copy" } });
  assert.equal(item.valid, false);
  assert.equal(item.arg, undefined);
});

test("infoItem is a non-actionable row", () => {
  const item = infoItem("No results", "try again");
  assert.equal(item.valid, false);
  assert.equal(item.title, "No results");
});
