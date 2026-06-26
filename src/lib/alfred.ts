// Helpers for emitting Alfred Script Filter JSON and rendering Quick Look files.
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export interface AlfredMod {
  valid?: boolean;
  arg?: string;
  subtitle?: string;
  variables?: Record<string, string>;
}

export interface AlfredItem {
  uid?: string;
  title: string;
  subtitle?: string;
  arg?: string;
  valid?: boolean;
  icon?: { path: string };
  quicklookurl?: string;
  text?: { copy?: string; largetype?: string };
  variables?: Record<string, string>;
  mods?: Record<string, AlfredMod>;
}

const ICON = "icon.png";

interface CopyAction {
  value: string;
  label: string;
}

export interface ItemOptions {
  uid?: string;
  title: string;
  subtitle?: string;
  iconPath?: string;
  /** Enter action: open this URL in the browser. */
  open?: string;
  /** ⌘ action: copy this value. */
  copyCmd?: CopyAction;
  /** ⌥ action: copy this value. */
  copyAlt?: CopyAction;
  /** ⇧ Quick Look: absolute path to a rendered file. */
  quicklook?: string;
}

/** Build a single Alfred item wired for the open/copy dispatcher + Quick Look. */
export function buildItem(opts: ItemOptions): AlfredItem {
  const item: AlfredItem = {
    uid: opts.uid,
    title: opts.title,
    subtitle: opts.subtitle,
    icon: { path: opts.iconPath ?? ICON },
  };

  if (opts.open) {
    item.valid = true;
    item.arg = opts.open;
    item.variables = { pdsls_action: "open", pdsls_value: opts.open };
  } else {
    // Nothing to open on Enter; still allow copy mods / Quick Look.
    item.valid = false;
  }

  const mods: Record<string, AlfredMod> = {};
  if (opts.copyCmd) {
    mods.cmd = {
      valid: true,
      arg: opts.copyCmd.value,
      subtitle: opts.copyCmd.label,
      variables: { pdsls_action: "copy", pdsls_value: opts.copyCmd.value },
    };
  }
  if (opts.copyAlt) {
    mods.alt = {
      valid: true,
      arg: opts.copyAlt.value,
      subtitle: opts.copyAlt.label,
      variables: { pdsls_action: "copy", pdsls_value: opts.copyAlt.value },
    };
  }
  if (Object.keys(mods).length > 0) item.mods = mods;

  if (opts.quicklook) item.quicklookurl = opts.quicklook;

  // Primary copy text (⌘C in Alfred) defaults to the cmd-copy value when present.
  if (opts.copyCmd) item.text = { copy: opts.copyCmd.value };

  return item;
}

/** A single non-actionable informational row (errors, empty states). */
export function infoItem(title: string, subtitle?: string): AlfredItem {
  return { title, subtitle, valid: false, icon: { path: ICON } };
}

/** Print the final Alfred Script Filter response and exit cleanly. */
export function output(items: AlfredItem[]): void {
  process.stdout.write(JSON.stringify({ items }));
}

// ----- Quick Look rendering -------------------------------------------------

function cacheDir(): string {
  const dir = process.env.alfred_workflow_cache || join(tmpdir(), "pdsls-alfred");
  mkdirSync(dir, { recursive: true });
  return dir;
}

/**
 * Render a markdown string to a styled HTML file in the workflow cache and
 * return its path, suitable for an item's `quicklookurl`.
 */
export function writeQuickLook(id: string, markdown: string): string {
  const path = join(cacheDir(), `${sanitize(id)}.html`);
  writeFileSync(path, htmlDocument(markdownToHtml(markdown)));
  return path;
}

function sanitize(id: string): string {
  return id.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 120);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Inline markdown: `code`, **bold**, *italic*. */
function inline(text: string): string {
  let out = escapeHtml(text);
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return out;
}

/** Minimal block-level markdown → HTML covering the subset our renderers emit. */
export function markdownToHtml(md: string): string {
  const lines = md.split("\n");
  const html: string[] = [];
  let inList = false;
  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, "");
    if (line === "") {
      closeList();
      continue;
    }
    if (line === "---") {
      closeList();
      html.push("<hr>");
      continue;
    }
    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }
    const listItem = /^(\s*)-\s+(.*)$/.exec(line);
    if (listItem) {
      const indent = listItem[1].length;
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      const style = indent > 0 ? ` style="margin-left:${indent * 0.6}em"` : "";
      html.push(`<li${style}>${inline(listItem[2])}</li>`);
      continue;
    }
    const quote = /^>\s?(.*)$/.exec(line);
    if (quote) {
      closeList();
      html.push(`<blockquote>${inline(quote[1])}</blockquote>`);
      continue;
    }
    closeList();
    html.push(`<p>${inline(line)}</p>`);
  }
  closeList();
  return html.join("\n");
}

function htmlDocument(body: string): string {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    body { font: 14px/1.5 -apple-system, system-ui, sans-serif; margin: 1.4em; color: #1c1c1e; max-width: 52em; }
    @media (prefers-color-scheme: dark) { body { background: #1e1e1e; color: #e6e6e6; } code, blockquote { background: #2c2c2e; } hr { border-color: #3a3a3c; } }
    h1 { font-size: 1.5em; } h2 { font-size: 1.25em; margin-top: 1.2em; } h3 { font-size: 1.05em; }
    code { background: #f0f0f2; padding: 0.1em 0.35em; border-radius: 4px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.9em; }
    blockquote { margin: 0.4em 0; padding: 0.2em 0.8em; border-left: 3px solid #c7c7cc; color: #6c6c70; background: #f7f7f8; }
    ul { margin: 0.3em 0; padding-left: 1.4em; } li { margin: 0.15em 0; }
    hr { border: none; border-top: 1px solid #d1d1d6; margin: 1.1em 0; }
    p { margin: 0.45em 0; }
  </style></head><body>${body}</body></html>`;
}
