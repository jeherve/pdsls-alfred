// Markdown rendering for lexicon schemas, PLC operation diffs, and DID documents.
// The lexicon renderer is ported from the Raycast extension's view-lexicon.tsx.
import type { DiffEntry } from "./plc-logs.js";

// ----- Lexicon schema rendering (ported from Raycast) -----------------------

export interface LexiconSchema {
  lexicon: number;
  id: string;
  description?: string;
  defs: Record<string, LexiconDef>;
}

interface LexiconPermission {
  type: "permission";
  resource: "repo" | "rpc" | "blob" | "account" | "identity";
  collection?: string[];
  action?: string[];
  lxm?: string[];
  aud?: string;
  inheritAud?: boolean;
}

interface LexiconDef {
  type: string;
  description?: string;
  key?: string;
  record?: LexiconObject;
  parameters?: LexiconObject;
  input?: { encoding: string; schema?: LexiconObject };
  output?: { encoding: string; schema?: LexiconObject };
  errors?: Array<{ name: string; description?: string }>;
  properties?: Record<string, LexiconProperty>;
  required?: string[];
  nullable?: string[];
  items?: LexiconProperty;
  refs?: string[];
  closed?: boolean;
  enum?: string[];
  const?: string;
  default?: unknown;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  maxGraphemes?: number;
  minGraphemes?: number;
  knownValues?: string[];
  format?: string;
  accept?: string[];
  maxSize?: number;
  title?: string;
  "title:langs"?: Record<string, string>;
  detail?: string;
  "detail:langs"?: Record<string, string>;
  permissions?: LexiconPermission[];
}

interface LexiconObject {
  type: string;
  description?: string;
  ref?: string;
  refs?: string[];
  closed?: boolean;
  properties?: Record<string, LexiconProperty>;
  required?: string[];
  nullable?: string[];
}

interface LexiconProperty {
  type: string;
  description?: string;
  ref?: string;
  refs?: string[];
  closed?: boolean;
  format?: string;
  items?: LexiconProperty;
  minLength?: number;
  maxLength?: number;
  maxGraphemes?: number;
  minGraphemes?: number;
  minimum?: number;
  maximum?: number;
  enum?: string[];
  const?: string | boolean | number;
  default?: unknown;
  knownValues?: string[];
  accept?: string[];
  maxSize?: number;
}

function formatType(prop: LexiconProperty): string {
  if (prop.ref) return `\`${prop.ref}\``;
  if (prop.refs) return "union";
  if (prop.format) return `\`${prop.type}:${prop.format}\``;
  return `\`${prop.type}\``;
}

function formatUnionRefs(refs: string[]): string {
  return refs.map((r) => `- \`${r}\``).join("\n") + "\n";
}

function formatConstraints(prop: LexiconProperty): string {
  const constraints: string[] = [];
  if (prop.minLength !== undefined) constraints.push(`minLength: ${prop.minLength}`);
  if (prop.maxLength !== undefined) constraints.push(`maxLength: ${prop.maxLength}`);
  if (prop.maxGraphemes !== undefined) constraints.push(`maxGraphemes: ${prop.maxGraphemes}`);
  if (prop.minGraphemes !== undefined) constraints.push(`minGraphemes: ${prop.minGraphemes}`);
  if (prop.minimum !== undefined) constraints.push(`min: ${prop.minimum}`);
  if (prop.maximum !== undefined) constraints.push(`max: ${prop.maximum}`);
  if (prop.maxSize !== undefined) constraints.push(`maxSize: ${prop.maxSize}`);
  if (prop.accept) constraints.push(`accept: [${prop.accept.join(", ")}]`);
  if (prop.enum) constraints.push(`enum: [${prop.enum.join(", ")}]`);
  if (prop.const !== undefined) constraints.push(`const: ${prop.const}`);
  if (prop.default !== undefined) constraints.push(`default: ${JSON.stringify(prop.default)}`);
  if (prop.knownValues) constraints.push(`knownValues: [${prop.knownValues.join(", ")}]`);
  if (prop.closed) constraints.push(`closed: true`);
  return constraints.length > 0 ? ` (${constraints.join(", ")})` : "";
}

function renderProperties(properties: Record<string, LexiconProperty>, required: string[] = []): string {
  let md = "";
  for (const [name, prop] of Object.entries(properties)) {
    const isRequired = required.includes(name);
    md += `**${name}** ${formatType(prop)}${formatConstraints(prop)}${isRequired ? " *required*" : ""}\n`;
    if (prop.refs) {
      md += formatUnionRefs(prop.refs);
    }
    if (prop.items) {
      md += `\nitems: ${formatType(prop.items)}${formatConstraints(prop.items)}\n`;
      if (prop.items.refs) {
        md += formatUnionRefs(prop.items.refs);
      }
    }
    if (prop.description) md += `> ${prop.description}\n`;
    md += "\n";
  }
  return md;
}

function renderPermission(permission: LexiconPermission, index: number): string {
  let md = `- **#${index + 1}** \`${permission.resource}\`\n`;
  if (permission.collection && permission.collection.length > 0) {
    md += `  - Collections:\n`;
    for (const col of permission.collection) {
      md += `    - \`${col}\`\n`;
    }
  }
  if (permission.action && permission.action.length > 0) {
    md += `  - Actions: ${permission.action.join(", ")}\n`;
  }
  if (permission.lxm && permission.lxm.length > 0) {
    md += `  - Lexicon Methods:\n`;
    for (const method of permission.lxm) {
      md += `    - \`${method}\`\n`;
    }
  }
  if (permission.aud) {
    md += `  - Audience: \`${permission.aud}\`\n`;
  }
  if (permission.inheritAud) {
    md += `  - Inherit Audience: true\n`;
  }
  return md;
}

function renderDef(name: string, def: LexiconDef): string {
  let md = `## ${name === "main" ? "Main Definition" : name} \`${def.type}\`\n\n`;

  if (def.description) md += `${def.description}\n\n`;

  if (def.key) md += `**Record Key:** \`${def.key}\`\n\n`;

  if (def.type === "permission-set") {
    if (def.title) md += `**Title:** ${def.title}\n\n`;
    if (def["title:langs"]) {
      md += `**Localized Titles:**\n`;
      for (const [lang, text] of Object.entries(def["title:langs"])) {
        md += `- \`${lang}\`: ${text}\n`;
      }
      md += "\n";
    }
    if (def.detail) md += `**Detail:** ${def.detail}\n\n`;
    if (def["detail:langs"]) {
      md += `**Localized Details:**\n`;
      for (const [lang, text] of Object.entries(def["detail:langs"])) {
        md += `- \`${lang}\`: ${text}\n`;
      }
      md += "\n";
    }
  }

  if (def.permissions && def.permissions.length > 0) {
    const supportedPermissions = def.permissions.filter((p) => p.resource === "repo" || p.resource === "rpc");
    if (supportedPermissions.length > 0) {
      md += `### Permissions\n\n`;
      supportedPermissions.forEach((permission, index) => {
        md += renderPermission(permission, index);
      });
      md += "\n";
    }
  }

  if (def.record?.properties && Object.keys(def.record.properties).length > 0) {
    md += `## Properties\n\n`;
    md += renderProperties(def.record.properties, def.record.required);
  }

  if (def.properties && Object.keys(def.properties).length > 0) {
    md += `## Properties\n\n`;
    md += renderProperties(def.properties, def.required);
  }

  if (def.parameters?.properties && Object.keys(def.parameters.properties).length > 0) {
    md += `## Parameters\n\n`;
    md += renderProperties(def.parameters.properties, def.parameters.required);
  }

  if (def.input) {
    md += `## Input\n\n`;
    md += `**Encoding:** \`${def.input.encoding}\`\n\n`;
    if (def.input.schema?.ref) md += `**Schema:** \`${def.input.schema.ref}\`\n\n`;
    if (def.input.schema?.refs) {
      md += `**Schema (union):**\n`;
      md += formatUnionRefs(def.input.schema.refs);
    }
    if (def.input.schema?.properties && Object.keys(def.input.schema.properties).length > 0) {
      md += renderProperties(def.input.schema.properties, def.input.schema.required);
    }
  }

  if (def.output) {
    md += `## Output\n\n`;
    md += `**Encoding:** \`${def.output.encoding}\`\n\n`;
    if (def.output.schema?.ref) md += `**Schema:** \`${def.output.schema.ref}\`\n\n`;
    if (def.output.schema?.refs) {
      md += `**Schema (union):**\n`;
      md += formatUnionRefs(def.output.schema.refs);
    }
    if (def.output.schema?.properties && Object.keys(def.output.schema.properties).length > 0) {
      md += renderProperties(def.output.schema.properties, def.output.schema.required);
    }
  }

  if (def.errors && def.errors.length > 0) {
    md += `## Errors\n\n`;
    for (const error of def.errors) {
      md += `- **${error.name}**`;
      if (error.description) md += `: ${error.description}`;
      md += "\n";
    }
    md += "\n";
  }

  if (def.refs) {
    md += `### Union Types\n\n`;
    md += formatUnionRefs(def.refs);
  }

  const defConstraints: string[] = [];
  if (def.minLength !== undefined) defConstraints.push(`minLength: ${def.minLength}`);
  if (def.maxLength !== undefined) defConstraints.push(`maxLength: ${def.maxLength}`);
  if (def.maxGraphemes !== undefined) defConstraints.push(`maxGraphemes: ${def.maxGraphemes}`);
  if (def.minGraphemes !== undefined) defConstraints.push(`minGraphemes: ${def.minGraphemes}`);
  if (def.minimum !== undefined) defConstraints.push(`min: ${def.minimum}`);
  if (def.maximum !== undefined) defConstraints.push(`max: ${def.maximum}`);
  if (def.maxSize !== undefined) defConstraints.push(`maxSize: ${def.maxSize}`);
  if (def.accept) defConstraints.push(`accept: [${def.accept.join(", ")}]`);
  if (def.closed) defConstraints.push(`closed: true`);
  if (defConstraints.length > 0) md += `**Constraints:** ${defConstraints.join(", ")}\n\n`;

  if (def.enum) md += `**Enum:** [${def.enum.join(", ")}]\n\n`;
  if (def.const) md += `**Const:** ${def.const}\n\n`;
  if (def.knownValues) md += `**Known Values:** [${def.knownValues.join(", ")}]\n\n`;

  if (def.items) {
    md += `### Items\n\n`;
    md += `${formatType(def.items)}${formatConstraints(def.items)}\n`;
    if (def.items.refs) {
      md += formatUnionRefs(def.items.refs);
    }
  }

  return md;
}

export function renderSchema(schema: LexiconSchema): string {
  let md = `# ${schema.id}\n\n`;
  md += `**Lexicon Version:** ${schema.lexicon}\n\n`;
  if (schema.description) md += `${schema.description}\n\n`;
  md += "---\n\n";

  const entries = Object.entries(schema.defs);
  for (let i = 0; i < entries.length; i++) {
    const [name, def] = entries[i];
    md += renderDef(name, def);
    if (i < entries.length - 1) {
      md += "---\n\n";
    }
  }

  return md;
}

/** One-line summary of a lexicon def for an Alfred row subtitle. */
export function defSummary(name: string, def: LexiconDef): string {
  const parts = [def.type];
  if (def.key) parts.push(`key: ${def.key}`);
  if (def.description) parts.push(def.description);
  return parts.join(" · ");
}

// ----- PLC operation diff rendering -----------------------------------------

/** Short human label for a single diff, used in row subtitles. */
export function diffLabel(diff: DiffEntry): string {
  switch (diff.type) {
    case "identity_created":
      return "Identity created";
    case "identity_tombstoned":
      return "Identity tombstoned";
    case "handle_added":
      return `Alias added: ${diff.handle}`;
    case "handle_removed":
      return `Alias removed: ${diff.handle}`;
    case "handle_changed":
      return `Alias changed: ${diff.prev_handle} → ${diff.next_handle}`;
    case "rotation_key_added":
      return "Rotation key added";
    case "rotation_key_removed":
      return "Rotation key removed";
    case "service_added":
      return `Service added: ${diff.service_id}`;
    case "service_removed":
      return `Service removed: ${diff.service_id}`;
    case "service_changed":
      return `Service changed: ${diff.service_id}`;
    case "verification_method_added":
      return `Verification method added: #${diff.method_id}`;
    case "verification_method_removed":
      return `Verification method removed: #${diff.method_id}`;
    case "verification_method_changed":
      return `Verification method changed: #${diff.method_id}`;
    default:
      return "Unknown change";
  }
}

/** Combined one-line summary of all diffs in an operation. */
export function diffSummary(diffs: DiffEntry[]): string {
  return diffs.map(diffLabel).join(" · ");
}

/** Full markdown detail for one operation's diffs (Quick Look). */
export function renderPlcOpMarkdown(date: string, cid: string, diffs: DiffEntry[]): string {
  let md = `# PLC Operation\n\n**Date:** ${date}\n\n**CID:** \`${cid}\`\n\n---\n\n`;
  for (const diff of diffs) {
    md += `## ${diffLabel(diff)}\n\n`;
    if (diff.orig.nullified) md += `> Nullified\n\n`;
    switch (diff.type) {
      case "identity_created":
        md += `**Also Known As:**\n${diff.alsoKnownAs.map((a) => `- ${a}`).join("\n")}\n\n`;
        md += `**Services:**\n${Object.entries(diff.services)
          .map(([id, svc]) => `- \`${id}\`: ${svc.endpoint}`)
          .join("\n")}\n\n`;
        md += `**Rotation Keys:**\n${diff.rotationKeys.map((k) => `- \`${k}\``).join("\n")}\n\n`;
        md += `**Verification Methods:**\n${Object.entries(diff.verificationMethods)
          .map(([id, key]) => `- \`#${id}\`: \`${key}\``)
          .join("\n")}\n\n`;
        break;
      case "handle_added":
      case "handle_removed":
        md += `**Handle:** ${diff.handle}\n\n`;
        break;
      case "handle_changed":
        md += `**From:** ${diff.prev_handle}\n\n**To:** ${diff.next_handle}\n\n`;
        break;
      case "rotation_key_added":
      case "rotation_key_removed":
        md += `**Key:** \`${diff.rotation_key}\`\n\n`;
        break;
      case "service_added":
      case "service_removed":
        md += `**Service ID:** \`${diff.service_id}\`\n\n**Endpoint:** ${diff.service_endpoint}\n\n`;
        break;
      case "service_changed":
        md += `**Service ID:** \`${diff.service_id}\`\n\n**From:** ${diff.prev_service_endpoint}\n\n**To:** ${diff.next_service_endpoint}\n\n`;
        break;
      case "verification_method_added":
      case "verification_method_removed":
        md += `**Method ID:** \`#${diff.method_id}\`\n\n**Key:** \`${diff.method_key}\`\n\n`;
        break;
      case "verification_method_changed":
        md += `**Method ID:** \`#${diff.method_id}\`\n\n**From:** \`${diff.prev_method_key}\`\n\n**To:** \`${diff.next_method_key}\`\n\n`;
        break;
    }
  }
  return md;
}

// ----- DID document / handle resolution rendering ---------------------------

interface DidService {
  id?: string;
  type: string | string[];
  serviceEndpoint: unknown;
}

interface DidVerificationMethod {
  id: string;
  publicKeyMultibase?: string;
}

interface DidDoc {
  alsoKnownAs?: string[];
  service?: DidService[];
  verificationMethod?: DidVerificationMethod[];
}

export function renderDidDocMarkdown(did: string, handle: string | null, doc: DidDoc): string {
  let md = `# ${handle ? `@${handle}` : did}\n\n**DID:** \`${did}\`\n\n`;
  if (doc.alsoKnownAs?.length) {
    md += `---\n\n## Also Known As\n\n${doc.alsoKnownAs.map((a) => `- ${a}`).join("\n")}\n\n`;
  }
  if (doc.service?.length) {
    md += `---\n\n## Services\n\n`;
    for (const svc of doc.service) {
      const type = Array.isArray(svc.type) ? svc.type[0] : svc.type;
      const endpoint = typeof svc.serviceEndpoint === "string" ? svc.serviceEndpoint : JSON.stringify(svc.serviceEndpoint);
      md += `- **${type}**: ${endpoint}\n`;
    }
    md += "\n";
  }
  if (doc.verificationMethod?.length) {
    md += `---\n\n## Verification Methods\n\n`;
    for (const vm of doc.verificationMethod) {
      md += `- **${vm.id.replace(did, "")}**: \`${vm.publicKeyMultibase ?? ""}\`\n`;
    }
    md += "\n";
  }
  return md;
}
