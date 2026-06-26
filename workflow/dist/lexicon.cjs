"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@atcute/identity/dist/typedefs.js
var typedefs_exports = {};
__export(typedefs_exports, {
  FRAGMENT_RE: () => FRAGMENT_RE,
  MULTIBASE_RE: () => MULTIBASE_RE,
  didDocument: () => didDocument,
  didRelativeUri: () => didRelativeUri,
  didString: () => didString,
  multibaseString: () => multibaseString,
  rfc3968UriSchema: () => rfc3968UriSchema,
  service: () => service,
  verificationMethod: () => verificationMethod
});

// node_modules/@atcute/lexicons/dist/syntax/did.js
var DID_RE = /^did:([a-z]+):([a-zA-Z0-9._:%-]*[a-zA-Z0-9._-])$/;
var isDid = /* @__NO_SIDE_EFFECTS__ */ (input) => {
  return typeof input === "string" && input.length >= 7 && input.length <= 2048 && DID_RE.test(input);
};

// node_modules/@atcute/lexicons/dist/syntax/utils/ascii.js
var isAsciiAlpha = /* @__NO_SIDE_EFFECTS__ */ (c) => {
  return c >= 65 && c <= 90 || c >= 97 && c <= 122;
};
var isAsciiAlphaNum = /* @__NO_SIDE_EFFECTS__ */ (c) => {
  return /* @__PURE__ */ isAsciiAlpha(c) || c >= 48 && c <= 57;
};

// node_modules/@atcute/lexicons/dist/syntax/nsid.js
var isNsid = /* @__NO_SIDE_EFFECTS__ */ (input) => {
  if (typeof input !== "string") {
    return false;
  }
  const len = input.length;
  if (len < 5 || len > 317) {
    return false;
  }
  let lastDot = -1;
  for (let j = len - 1; j >= 0; j--) {
    if (input.charCodeAt(j) === 46) {
      lastDot = j;
      break;
    }
  }
  if (lastDot === -1) {
    return false;
  }
  let segStart = 0;
  let segIdx = 0;
  for (let i = 0; i <= lastDot; i++) {
    if (i === lastDot || input.charCodeAt(i) === 46) {
      const segLen = i - segStart;
      if (segLen === 0 || segLen > 63) {
        return false;
      }
      const first = input.charCodeAt(segStart);
      if (segIdx === 0) {
        if (!isAsciiAlpha(first)) {
          return false;
        }
      } else {
        if (!isAsciiAlphaNum(first)) {
          return false;
        }
      }
      if (segLen > 1) {
        if (!isAsciiAlphaNum(input.charCodeAt(i - 1))) {
          return false;
        }
        for (let j = segStart + 1; j < i - 1; j++) {
          const c = input.charCodeAt(j);
          if (!isAsciiAlphaNum(c) && c !== 45) {
            return false;
          }
        }
      }
      segStart = i + 1;
      segIdx++;
    }
  }
  if (segIdx < 2) {
    return false;
  }
  const nameStart = lastDot + 1;
  const nameLen = len - nameStart;
  if (nameLen === 0 || nameLen > 63) {
    return false;
  }
  if (!isAsciiAlpha(input.charCodeAt(nameStart))) {
    return false;
  }
  for (let j = nameStart + 1; j < len; j++) {
    if (!isAsciiAlphaNum(input.charCodeAt(j))) {
      return false;
    }
  }
  return true;
};

// node_modules/@atcute/uint8array/dist/index.node.js
var import_node_buffer = require("node:buffer");
var import_node_crypto = require("node:crypto");
var _alloc = /* @__PURE__ */ (() => import_node_buffer.Buffer.alloc)();
var _allocUnsafe = /* @__PURE__ */ (() => import_node_buffer.Buffer.allocUnsafe)();
var _concat = /* @__PURE__ */ (() => import_node_buffer.Buffer.concat)();
var _from = /* @__PURE__ */ (() => import_node_buffer.Buffer.from)();
var _byteLength = /* @__PURE__ */ (() => import_node_buffer.Buffer.byteLength)();
var _compare = /* @__PURE__ */ (() => import_node_buffer.Buffer.prototype.compare)();
var _utf8Slice = /* @__PURE__ */ (() => import_node_buffer.Buffer.prototype.utf8Slice)();
var _utf8Write = /* @__PURE__ */ (() => import_node_buffer.Buffer.prototype.utf8Write)();
var toUint8Array = (buffer) => {
  return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
};
var alloc = (size) => {
  return toUint8Array(_alloc(size));
};
var allocUnsafe = (size) => {
  return toUint8Array(_allocUnsafe(size));
};
var compare = (a, b) => {
  return _compare.call(a, b);
};
var concat = (arrays, size) => {
  return toUint8Array(_concat(arrays, size));
};
var encodeUtf8 = (str) => {
  return toUint8Array(_from(str, "utf8"));
};
var encodeUtf8Into = (to, str, offset, length) => {
  return _utf8Write.call(to, str, offset, length);
};
var _fromCharCode = String.fromCharCode;
var _shortString = (from, p, length) => {
  if (length < 4) {
    if (length < 2) {
      if (length === 0) {
        return "";
      }
      const a3 = from[p];
      if (a3 & 128) {
        return null;
      }
      return _fromCharCode(a3);
    }
    const a2 = from[p];
    const b2 = from[p + 1];
    if ((a2 | b2) & 128) {
      return null;
    }
    if (length === 2) {
      return _fromCharCode(a2, b2);
    }
    const c2 = from[p + 2];
    if (c2 & 128) {
      return null;
    }
    return _fromCharCode(a2, b2, c2);
  }
  const a = from[p];
  const b = from[p + 1];
  const c = from[p + 2];
  const d = from[p + 3];
  if ((a | b | c | d) & 128) {
    return null;
  }
  if (length < 8) {
    if (length === 4) {
      return _fromCharCode(a, b, c, d);
    }
    const e2 = from[p + 4];
    if (e2 & 128) {
      return null;
    }
    if (length === 5) {
      return _fromCharCode(a, b, c, d, e2);
    }
    const f2 = from[p + 5];
    if (f2 & 128) {
      return null;
    }
    if (length === 6) {
      return _fromCharCode(a, b, c, d, e2, f2);
    }
    const g2 = from[p + 6];
    if (g2 & 128) {
      return null;
    }
    return _fromCharCode(a, b, c, d, e2, f2, g2);
  }
  const e = from[p + 4];
  const f = from[p + 5];
  const g = from[p + 6];
  const h = from[p + 7];
  if ((e | f | g | h) & 128) {
    return null;
  }
  if (length < 12) {
    if (length === 8) {
      return _fromCharCode(a, b, c, d, e, f, g, h);
    }
    const i2 = from[p + 8];
    if (i2 & 128) {
      return null;
    }
    if (length === 9) {
      return _fromCharCode(a, b, c, d, e, f, g, h, i2);
    }
    const j2 = from[p + 9];
    if (j2 & 128) {
      return null;
    }
    if (length === 10) {
      return _fromCharCode(a, b, c, d, e, f, g, h, i2, j2);
    }
    const k2 = from[p + 10];
    if (k2 & 128) {
      return null;
    }
    return _fromCharCode(a, b, c, d, e, f, g, h, i2, j2, k2);
  }
  const i = from[p + 8];
  const j = from[p + 9];
  const k = from[p + 10];
  const l = from[p + 11];
  if ((i | j | k | l) & 128) {
    return null;
  }
  if (length === 12) {
    return _fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l);
  }
  const m = from[p + 12];
  if (m & 128) {
    return null;
  }
  if (length === 13) {
    return _fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m);
  }
  const n = from[p + 13];
  if (n & 128) {
    return null;
  }
  if (length === 14) {
    return _fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
  }
  const o = from[p + 14];
  if (o & 128) {
    return null;
  }
  return _fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o);
};
var decodeUtf8From = (from, offset = 0, length = from.length) => {
  if (length <= 15) {
    const result = _shortString(from, offset, length);
    if (result !== null) {
      return result;
    }
  }
  return _utf8Slice.call(from, offset, offset + length);
};
var getUtf8Length = (str) => {
  return _byteLength(str, "utf8");
};
var toSha256 = async (buffer) => {
  return toUint8Array((0, import_node_crypto.hash)("sha256", buffer, "buffer"));
};

// node_modules/@badrap/valita/dist/node-mjs/index.mjs
function expectedType(expected) {
  return {
    ok: false,
    code: "invalid_type",
    expected
  };
}
var ISSUE_EXPECTED_NOTHING = expectedType([]);
var ISSUE_EXPECTED_STRING = expectedType(["string"]);
var ISSUE_EXPECTED_NUMBER = expectedType(["number"]);
var ISSUE_EXPECTED_BIGINT = expectedType(["bigint"]);
var ISSUE_EXPECTED_BOOLEAN = expectedType(["boolean"]);
var ISSUE_EXPECTED_UNDEFINED = expectedType(["undefined"]);
var ISSUE_EXPECTED_NULL = expectedType(["null"]);
var ISSUE_EXPECTED_OBJECT = expectedType(["object"]);
var ISSUE_EXPECTED_ARRAY = expectedType(["array"]);
var ISSUE_MISSING_VALUE = {
  ok: false,
  code: "missing_value"
};
function joinIssues(left, right) {
  return left ? { ok: false, code: "join", left, right } : right;
}
function prependPath(key, tree) {
  return { ok: false, code: "prepend", key, tree };
}
function cloneIssueWithPath(tree, path) {
  const code = tree.code;
  switch (code) {
    case "invalid_type":
      return { code, path, expected: tree.expected };
    case "invalid_literal":
      return { code, path, expected: tree.expected };
    case "missing_value":
      return { code, path };
    case "invalid_length":
      return {
        code,
        path,
        minLength: tree.minLength,
        maxLength: tree.maxLength
      };
    case "unrecognized_keys":
      return { code, path, keys: tree.keys };
    case "invalid_union":
      return { code, path, tree: tree.tree, issues: collectIssues(tree.tree) };
    case "custom_error":
      if (typeof tree.error === "object" && tree.error.path !== void 0) {
        path.push(...tree.error.path);
      }
      return {
        code,
        path,
        message: typeof tree.error === "string" ? tree.error : tree.error?.message,
        error: tree.error
      };
  }
}
function collectIssues(tree, path = [], issues = []) {
  for (; ; ) {
    if (tree.code === "join") {
      collectIssues(tree.left, path.slice(), issues);
      tree = tree.right;
    } else if (tree.code === "prepend") {
      path.push(tree.key);
      tree = tree.tree;
    } else {
      issues.push(cloneIssueWithPath(tree, path));
      return issues;
    }
  }
}
function separatedList(list, sep) {
  if (list.length === 0) {
    return "nothing";
  } else if (list.length === 1) {
    return list[0];
  } else {
    return `${list.slice(0, -1).join(", ")} ${sep} ${list[list.length - 1]}`;
  }
}
function formatLiteral(value) {
  return typeof value === "bigint" ? `${value}n` : JSON.stringify(value);
}
function countIssues(tree) {
  let count = 0;
  for (; ; ) {
    if (tree.code === "join") {
      count += countIssues(tree.left);
      tree = tree.right;
    } else if (tree.code === "prepend") {
      tree = tree.tree;
    } else {
      return count + 1;
    }
  }
}
function formatIssueTree(tree) {
  let path = "";
  let count = 0;
  for (; ; ) {
    if (tree.code === "join") {
      count += countIssues(tree.right);
      tree = tree.left;
    } else if (tree.code === "prepend") {
      path += `.${tree.key}`;
      tree = tree.tree;
    } else {
      break;
    }
  }
  let message = "validation failed";
  if (tree.code === "invalid_type") {
    message = `expected ${separatedList(tree.expected, "or")}`;
  } else if (tree.code === "invalid_literal") {
    message = `expected ${separatedList(tree.expected.map(formatLiteral), "or")}`;
  } else if (tree.code === "missing_value") {
    message = `missing value`;
  } else if (tree.code === "unrecognized_keys") {
    const keys = tree.keys;
    message = `unrecognized ${keys.length === 1 ? "key" : "keys"} ${separatedList(keys.map(formatLiteral), "and")}`;
  } else if (tree.code === "invalid_length") {
    const min = tree.minLength;
    const max = tree.maxLength;
    message = `expected an array with `;
    if (min > 0) {
      if (max === min) {
        message += `${min}`;
      } else if (max !== void 0) {
        message += `between ${min} and ${max}`;
      } else {
        message += `at least ${min}`;
      }
    } else {
      message += `at most ${max ?? "\u221E"}`;
    }
    message += ` item(s)`;
  } else if (tree.code === "custom_error") {
    const error = tree.error;
    if (typeof error === "string") {
      message = error;
    } else if (error !== void 0) {
      if (error.message !== void 0) {
        message = error.message;
      }
      if (error.path !== void 0) {
        path += "." + error.path.join(".");
      }
    }
  }
  let msg = `${tree.code} at .${path.slice(1)} (${message})`;
  if (count === 1) {
    msg += ` (+ 1 other issue)`;
  } else if (count > 1) {
    msg += ` (+ ${count} other issues)`;
  }
  return msg;
}
function lazyProperty(obj, prop, value, enumerable) {
  Object.defineProperty(obj, prop, {
    value,
    enumerable,
    writable: false
  });
  return value;
}
var ValitaError = class extends Error {
  constructor(issueTree) {
    super(formatIssueTree(issueTree));
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = new.target.name;
    this._issueTree = issueTree;
  }
  get issues() {
    return lazyProperty(this, "issues", collectIssues(this._issueTree), true);
  }
};
var ErrImpl = class {
  constructor(issueTree) {
    this.ok = false;
    this._issueTree = issueTree;
  }
  get issues() {
    return lazyProperty(this, "issues", collectIssues(this._issueTree), true);
  }
  get message() {
    return lazyProperty(this, "message", formatIssueTree(this._issueTree), true);
  }
  throw() {
    throw new ValitaError(this._issueTree);
  }
};
function ok(value) {
  return { ok: true, value };
}
function err(error) {
  return new ErrImpl({ ok: false, code: "custom_error", error });
}
function isObject(v) {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}
var FLAG_FORBID_EXTRA_KEYS = 1 << 0;
var FLAG_STRIP_EXTRA_KEYS = 1 << 1;
var FLAG_MISSING_VALUE = 1 << 2;
var TAG_UNKNOWN = 0;
var TAG_NEVER = 1;
var TAG_STRING = 2;
var TAG_NUMBER = 3;
var TAG_BIGINT = 4;
var TAG_BOOLEAN = 5;
var TAG_NULL = 6;
var TAG_UNDEFINED = 7;
var TAG_LITERAL = 8;
var TAG_OPTIONAL = 9;
var TAG_OBJECT = 10;
var TAG_ARRAY = 11;
var TAG_UNION = 12;
var TAG_SIMPLE_UNION = 13;
var TAG_TRANSFORM = 14;
var TAG_OTHER = 15;
var taggedMatcher = (tag, match) => {
  return { tag, match };
};
function callMatcher(matcher, value, flags) {
  switch (matcher.tag) {
    case TAG_UNKNOWN:
      return void 0;
    case TAG_NEVER:
      return ISSUE_EXPECTED_NOTHING;
    case TAG_STRING:
      return typeof value === "string" ? void 0 : ISSUE_EXPECTED_STRING;
    case TAG_NUMBER:
      return typeof value === "number" ? void 0 : ISSUE_EXPECTED_NUMBER;
    case TAG_BIGINT:
      return typeof value === "bigint" ? void 0 : ISSUE_EXPECTED_BIGINT;
    case TAG_BOOLEAN:
      return typeof value === "boolean" ? void 0 : ISSUE_EXPECTED_BOOLEAN;
    case TAG_NULL:
      return value === null ? void 0 : ISSUE_EXPECTED_NULL;
    case TAG_UNDEFINED:
      return value === void 0 ? void 0 : ISSUE_EXPECTED_UNDEFINED;
    case TAG_LITERAL:
      return matcher.match(value, flags);
    case TAG_OPTIONAL:
      return matcher.match(value, flags);
    case TAG_OBJECT:
      return matcher.match(value, flags);
    case TAG_ARRAY:
      return matcher.match(value, flags);
    case TAG_UNION:
      return matcher.match(value, flags);
    case TAG_SIMPLE_UNION:
      return matcher.match(value, flags);
    case TAG_TRANSFORM:
      return matcher.match(value, flags);
    default:
      return matcher.match(value, flags);
  }
}
var MATCHER_SYMBOL = Symbol.for("@valita/internal");
var AbstractType = class {
  default(defaultValue) {
    const defaultResult = ok(defaultValue);
    return new TransformType(this.optional(), (v) => {
      return v === void 0 ? defaultResult : void 0;
    });
  }
  /**
   * Derive a new validator that uses the provided predicate function to
   * perform custom validation for the source validator's output values.
   *
   * The predicate function should return `true` when the source
   * type's output value is valid, `false` otherwise. The checked value
   * itself won't get modified or replaced, and is returned as-is on
   * validation success.
   *
   * @example A validator that accepts only numeric strings.
   * ```ts
   * const numericString = v.string().assert((s) => /^\d+$/.test(s))
   * numericString.parse("1");
   * // "1"
   * numericString.parse("foo");
   * // ValitaError: custom_error at . (validation failed)
   * ```
   *
   * You can also _refine_ the output type by passing in a
   * [type predicate](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates).
   * Note that the type predicate must have a compatible input type.
   *
   * @example A validator with its output type refined to `Date`.
   * ```ts
   * const dateType = v.unknown().assert((v): v is Date => v instanceof Date);
   * ```
   *
   * You can also pass in a custom failure messages.
   *
   * @example A validator that rejects non-integers with a custom error.
   * ```ts
   * const integer = v.number().assert((n) => Number.isInteger(n), "not an integer");
   * integer.parse(1);
   * // 1
   * integer.parse(1.5);
   * // ValitaError: custom_error at . (not an integer)
   * ```
   *
   * @param func - The assertion predicate function.
   * @param [error] - A custom error for situations when the assertion
   *                  predicate returns `false`.
   */
  assert(func, error) {
    const err2 = { ok: false, code: "custom_error", error };
    return new TransformType(this, (v, flags) => func(v, flagsToOptions(flags)) ? void 0 : err2);
  }
  map(func) {
    return new TransformType(this, (v, flags) => ({
      ok: true,
      value: func(v, flagsToOptions(flags))
    }));
  }
  chain(input) {
    if (typeof input === "function") {
      return new TransformType(this, (v, flags) => {
        const r = input(v, flagsToOptions(flags));
        return r.ok ? r : r._issueTree;
      });
    }
    return new TransformType(this, (v, flags) => callMatcher(input[MATCHER_SYMBOL], v, flags));
  }
};
var Type = class extends AbstractType {
  optional(defaultFn) {
    const optional = new Optional(this);
    if (!defaultFn) {
      return optional;
    }
    return new TransformType(optional, (v) => {
      return v === void 0 ? { ok: true, value: defaultFn() } : void 0;
    });
  }
  nullable(defaultFn) {
    const nullable = new SimpleUnion([null_(), this]);
    if (!defaultFn) {
      return nullable;
    }
    return new TransformType(nullable, (v) => {
      return v === null ? { ok: true, value: defaultFn() } : void 0;
    });
  }
  _toTerminals(func) {
    func(this);
  }
  /**
   * Parse a value without throwing.
   */
  try(v, options) {
    const r = callMatcher(this[MATCHER_SYMBOL], v, options === void 0 ? FLAG_FORBID_EXTRA_KEYS : options.mode === "strip" ? FLAG_STRIP_EXTRA_KEYS : options.mode === "passthrough" ? 0 : FLAG_FORBID_EXTRA_KEYS);
    return r === void 0 || r.ok ? { ok: true, value: r === void 0 ? v : r.value } : new ErrImpl(r);
  }
  /**
   * Parse a value. Throw a ValitaError on failure.
   */
  parse(v, options) {
    const r = callMatcher(this[MATCHER_SYMBOL], v, options === void 0 ? FLAG_FORBID_EXTRA_KEYS : options.mode === "strip" ? FLAG_STRIP_EXTRA_KEYS : options.mode === "passthrough" ? 0 : FLAG_FORBID_EXTRA_KEYS);
    if (r === void 0 || r.ok) {
      return r === void 0 ? v : r.value;
    }
    throw new ValitaError(r);
  }
};
var SimpleUnion = class extends Type {
  constructor(options) {
    super();
    this.name = "union";
    this.options = options;
  }
  get [MATCHER_SYMBOL]() {
    const options = this.options.map((o) => o[MATCHER_SYMBOL]);
    return lazyProperty(this, MATCHER_SYMBOL, taggedMatcher(TAG_SIMPLE_UNION, (v, flags) => {
      let issue = ISSUE_EXPECTED_NOTHING;
      for (const option of options) {
        const result = callMatcher(option, v, flags);
        if (result === void 0 || result.ok) {
          return result;
        }
        issue = result;
      }
      return issue;
    }), false);
  }
  _toTerminals(func) {
    for (const option of this.options) {
      option._toTerminals(func);
    }
  }
};
var Optional = class extends AbstractType {
  constructor(type) {
    super();
    this.name = "optional";
    this.type = type;
  }
  optional(defaultFn) {
    if (!defaultFn) {
      return this;
    }
    return new TransformType(this, (v) => {
      return v === void 0 ? { ok: true, value: defaultFn() } : void 0;
    });
  }
  get [MATCHER_SYMBOL]() {
    const matcher = this.type[MATCHER_SYMBOL];
    return lazyProperty(this, MATCHER_SYMBOL, taggedMatcher(TAG_OPTIONAL, (v, flags) => v === void 0 || flags & FLAG_MISSING_VALUE ? void 0 : callMatcher(matcher, v, flags)), false);
  }
  _toTerminals(func) {
    func(this);
    func(undefined_());
    this.type._toTerminals(func);
  }
};
function setBit(bits, index) {
  if (typeof bits !== "number") {
    const idx = index >> 5;
    for (let i = bits.length; i <= idx; i++) {
      bits.push(0);
    }
    bits[idx] |= 1 << index % 32;
    return bits;
  } else if (index < 32) {
    return bits | 1 << index;
  } else {
    return setBit([bits, 0], index);
  }
}
function getBit(bits, index) {
  if (typeof bits === "number") {
    return index < 32 ? bits >>> index & 1 : 0;
  } else {
    return bits[index >> 5] >>> index % 32 & 1;
  }
}
var ObjectType = class _ObjectType extends Type {
  constructor(shape, restType, checks) {
    super();
    this.name = "object";
    this.shape = shape;
    this._restType = restType;
    this._checks = checks;
  }
  get [MATCHER_SYMBOL]() {
    const func = createObjectMatcher(this.shape, this._restType, this._checks);
    return lazyProperty(this, MATCHER_SYMBOL, taggedMatcher(TAG_OBJECT, (v, flags) => isObject(v) ? func(v, flags) : ISSUE_EXPECTED_OBJECT), false);
  }
  check(func, error) {
    const issue = { ok: false, code: "custom_error", error };
    return new _ObjectType(this.shape, this._restType, [
      ...this._checks ?? [],
      {
        func,
        issue
      }
    ]);
  }
  rest(restType) {
    return new _ObjectType(this.shape, restType);
  }
  extend(shape) {
    return new _ObjectType({ ...this.shape, ...shape }, this._restType);
  }
  pick(...keys) {
    const shape = {};
    for (const key of keys) {
      set(shape, key, this.shape[key]);
    }
    return new _ObjectType(shape, void 0);
  }
  omit(...keys) {
    const shape = { ...this.shape };
    for (const key of keys) {
      delete shape[key];
    }
    return new _ObjectType(shape, this._restType);
  }
  partial() {
    const shape = {};
    for (const key of Object.keys(this.shape)) {
      set(shape, key, this.shape[key].optional());
    }
    const rest = this._restType?.optional();
    return new _ObjectType(shape, rest);
  }
};
function set(obj, key, value) {
  if (key === "__proto__") {
    Object.defineProperty(obj, key, {
      value,
      writable: true,
      enumerable: true,
      configurable: true
    });
  } else {
    obj[key] = value;
  }
}
function createObjectMatcher(shape, rest, checks) {
  const indexedEntries = Object.keys(shape).map((key, index) => {
    const type = shape[key];
    let optional = false;
    type._toTerminals((t) => {
      optional ||= t.name === "optional";
    });
    return {
      key,
      index,
      matcher: type[MATCHER_SYMBOL],
      optional,
      missing: prependPath(key, ISSUE_MISSING_VALUE)
    };
  });
  const keyedEntries = /* @__PURE__ */ Object.create(null);
  for (const entry of indexedEntries) {
    keyedEntries[entry.key] = entry;
  }
  const restMatcher = rest?.[MATCHER_SYMBOL];
  const fastPath = indexedEntries.length === 0 && rest?.name === "unknown" && checks === void 0;
  return (obj, flags) => {
    if (fastPath) {
      return void 0;
    }
    let output2 = void 0;
    let issues = void 0;
    let unrecognized = void 0;
    let seenBits = 0;
    let seenCount = 0;
    if (flags & (FLAG_FORBID_EXTRA_KEYS | FLAG_STRIP_EXTRA_KEYS) || restMatcher !== void 0) {
      for (const key in obj) {
        const value = obj[key];
        const entry = keyedEntries[key];
        if (entry === void 0 && restMatcher === void 0) {
          if (flags & FLAG_FORBID_EXTRA_KEYS) {
            if (unrecognized === void 0) {
              unrecognized = [key];
              issues = joinIssues(issues, {
                ok: false,
                code: "unrecognized_keys",
                keys: unrecognized
              });
            } else {
              unrecognized.push(key);
            }
          } else if (flags & FLAG_STRIP_EXTRA_KEYS && issues === void 0 && output2 === void 0) {
            output2 = {};
            for (let m = 0; m < indexedEntries.length; m++) {
              if (getBit(seenBits, m)) {
                const k = indexedEntries[m].key;
                set(output2, k, obj[k]);
              }
            }
          }
          continue;
        }
        const r = entry === void 0 ? callMatcher(restMatcher, value, flags) : callMatcher(entry.matcher, value, flags);
        if (r === void 0) {
          if (output2 !== void 0 && issues === void 0) {
            set(output2, key, value);
          }
        } else if (!r.ok) {
          issues = joinIssues(issues, prependPath(key, r));
        } else if (issues === void 0) {
          if (output2 === void 0) {
            output2 = {};
            if (restMatcher === void 0) {
              for (let m = 0; m < indexedEntries.length; m++) {
                if (getBit(seenBits, m)) {
                  const k = indexedEntries[m].key;
                  set(output2, k, obj[k]);
                }
              }
            } else {
              for (const k in obj) {
                set(output2, k, obj[k]);
              }
            }
          }
          set(output2, key, r.value);
        }
        if (entry !== void 0) {
          seenCount++;
          seenBits = setBit(seenBits, entry.index);
        }
      }
    }
    if (seenCount < indexedEntries.length) {
      for (let i = 0; i < indexedEntries.length; i++) {
        if (getBit(seenBits, i)) {
          continue;
        }
        const entry = indexedEntries[i];
        const value = obj[entry.key];
        let extraFlags = 0;
        if (value === void 0 && !(entry.key in obj)) {
          if (!entry.optional) {
            issues = joinIssues(issues, entry.missing);
            continue;
          }
          extraFlags = FLAG_MISSING_VALUE;
        }
        const r = callMatcher(entry.matcher, value, flags | extraFlags);
        if (r === void 0) {
          if (output2 !== void 0 && issues === void 0 && !extraFlags) {
            set(output2, entry.key, value);
          }
        } else if (!r.ok) {
          issues = joinIssues(issues, prependPath(entry.key, r));
        } else if (issues === void 0) {
          if (output2 === void 0) {
            output2 = {};
            if (restMatcher === void 0) {
              for (let m = 0; m < indexedEntries.length; m++) {
                if (m < i || getBit(seenBits, m)) {
                  const k = indexedEntries[m].key;
                  set(output2, k, obj[k]);
                }
              }
            } else {
              for (const k in obj) {
                set(output2, k, obj[k]);
              }
              for (let m = 0; m < i; m++) {
                if (!getBit(seenBits, m)) {
                  const k = indexedEntries[m].key;
                  set(output2, k, obj[k]);
                }
              }
            }
          }
          set(output2, entry.key, r.value);
        }
      }
    }
    if (issues !== void 0) {
      return issues;
    }
    if (checks !== void 0) {
      for (const { func, issue } of checks) {
        if (!func(output2 ?? obj)) {
          return issue;
        }
      }
    }
    return output2 && { ok: true, value: output2 };
  };
}
var ArrayOrTupleType = class _ArrayOrTupleType extends Type {
  constructor(prefix, rest, suffix) {
    super();
    this.name = "array";
    this._prefix = prefix;
    this._rest = rest;
    this._suffix = suffix;
  }
  get [MATCHER_SYMBOL]() {
    const prefix = this._prefix.map((t) => t[MATCHER_SYMBOL]);
    const suffix = this._suffix.map((t) => t[MATCHER_SYMBOL]);
    const rest = this._rest?.[MATCHER_SYMBOL] ?? taggedMatcher(1, () => ISSUE_MISSING_VALUE);
    const minLength = prefix.length + suffix.length;
    const maxLength = this._rest ? Infinity : minLength;
    const invalidLength = {
      ok: false,
      code: "invalid_length",
      minLength,
      maxLength: maxLength === Infinity ? void 0 : maxLength
    };
    return lazyProperty(this, MATCHER_SYMBOL, taggedMatcher(TAG_ARRAY, (arr, flags) => {
      if (!Array.isArray(arr)) {
        return ISSUE_EXPECTED_ARRAY;
      }
      const length = arr.length;
      if (length < minLength || length > maxLength) {
        return invalidLength;
      }
      const headEnd = prefix.length;
      const tailStart = arr.length - suffix.length;
      let issueTree = void 0;
      let output2 = arr;
      for (let i = 0; i < arr.length; i++) {
        const entry = i < headEnd ? prefix[i] : i >= tailStart ? suffix[i - tailStart] : rest;
        const r = callMatcher(entry, arr[i], flags);
        if (r !== void 0) {
          if (r.ok) {
            if (output2 === arr) {
              output2 = arr.slice();
            }
            output2[i] = r.value;
          } else {
            issueTree = joinIssues(issueTree, prependPath(i, r));
          }
        }
      }
      if (issueTree) {
        return issueTree;
      } else if (arr === output2) {
        return void 0;
      } else {
        return { ok: true, value: output2 };
      }
    }), false);
  }
  concat(type) {
    if (this._rest) {
      if (type._rest) {
        throw new TypeError("can not concatenate two variadic types");
      }
      return new _ArrayOrTupleType(this._prefix, this._rest, [
        ...this._suffix,
        ...type._prefix,
        ...type._suffix
      ]);
    } else if (type._rest) {
      return new _ArrayOrTupleType([...this._prefix, ...this._suffix, ...type._prefix], type._rest, type._suffix);
    } else {
      return new _ArrayOrTupleType([...this._prefix, ...this._suffix, ...type._prefix, ...type._suffix], type._rest, type._suffix);
    }
  }
};
function toInputType(v) {
  const type = typeof v;
  if (type !== "object") {
    return type;
  } else if (v === null) {
    return "null";
  } else if (Array.isArray(v)) {
    return "array";
  } else {
    return type;
  }
}
function dedup(arr) {
  return [...new Set(arr)];
}
function groupTerminals(terminals) {
  const order = /* @__PURE__ */ new Map();
  const literals = /* @__PURE__ */ new Map();
  const types = /* @__PURE__ */ new Map();
  const unknowns = [];
  const optionals = [];
  const expectedTypes = [];
  for (const { root, terminal } of terminals) {
    order.set(root, order.get(root) ?? order.size);
    if (terminal.name === "never") {
    } else if (terminal.name === "optional") {
      optionals.push(root);
    } else if (terminal.name === "unknown") {
      unknowns.push(root);
    } else if (terminal.name === "literal") {
      const roots = literals.get(terminal.value) ?? [];
      roots.push(root);
      literals.set(terminal.value, roots);
      expectedTypes.push(toInputType(terminal.value));
    } else {
      const roots = types.get(terminal.name) ?? [];
      roots.push(root);
      types.set(terminal.name, roots);
      expectedTypes.push(terminal.name);
    }
  }
  const byOrder = (a, b) => {
    return (order.get(a) ?? 0) - (order.get(b) ?? 0);
  };
  for (const [value, roots] of literals) {
    const options = types.get(toInputType(value));
    if (options) {
      options.push(...roots);
      literals.delete(value);
    } else {
      literals.set(value, dedup(roots.concat(unknowns)).sort(byOrder));
    }
  }
  for (const [type, roots] of types) {
    types.set(type, dedup(roots.concat(unknowns)).sort(byOrder));
  }
  return {
    types,
    literals,
    unknowns: dedup(unknowns).sort(byOrder),
    optionals: dedup(optionals).sort(byOrder),
    expectedTypes: dedup(expectedTypes)
  };
}
function createObjectKeyMatcher(objects, key) {
  const list = [];
  for (const { root, terminal } of objects) {
    terminal.shape[key]._toTerminals((t) => list.push({ root, terminal: t }));
  }
  const { types, literals, optionals, unknowns, expectedTypes } = groupTerminals(list);
  if (unknowns.length > 0 || optionals.length > 1) {
    return void 0;
  }
  for (const roots of literals.values()) {
    if (roots.length > 1) {
      return void 0;
    }
  }
  for (const roots of types.values()) {
    if (roots.length > 1) {
      return void 0;
    }
  }
  const missingValue = prependPath(key, ISSUE_MISSING_VALUE);
  const issue = prependPath(key, types.size === 0 ? {
    ok: false,
    code: "invalid_literal",
    expected: [...literals.keys()]
  } : {
    ok: false,
    code: "invalid_type",
    expected: expectedTypes
  });
  const byLiteral = literals.size > 0 ? /* @__PURE__ */ new Map() : void 0;
  if (byLiteral) {
    for (const [literal2, options] of literals) {
      byLiteral.set(literal2, options[0][MATCHER_SYMBOL]);
    }
  }
  const byType = types.size > 0 ? {} : void 0;
  if (byType) {
    for (const [type, options] of types) {
      byType[type] = options[0][MATCHER_SYMBOL];
    }
  }
  const optional = optionals[0]?.[MATCHER_SYMBOL];
  return (obj, flags) => {
    const value = obj[key];
    if (value === void 0 && !(key in obj)) {
      return optional === void 0 ? missingValue : callMatcher(optional, obj, flags);
    }
    const option = byType?.[toInputType(value)] ?? byLiteral?.get(value);
    return option ? callMatcher(option, obj, flags) : issue;
  };
}
function createUnionObjectMatcher(terminals) {
  const objects = [];
  const keyCounts = /* @__PURE__ */ new Map();
  for (const { root, terminal } of terminals) {
    if (terminal.name === "unknown") {
      return void 0;
    }
    if (terminal.name === "object") {
      for (const key in terminal.shape) {
        keyCounts.set(key, (keyCounts.get(key) ?? 0) + 1);
      }
      objects.push({ root, terminal });
    }
  }
  if (objects.length < 2) {
    return void 0;
  }
  for (const [key, count] of keyCounts) {
    if (count === objects.length) {
      const matcher = createObjectKeyMatcher(objects, key);
      if (matcher) {
        return matcher;
      }
    }
  }
  return void 0;
}
function createUnionBaseMatcher(terminals) {
  const { expectedTypes, literals, types, unknowns, optionals } = groupTerminals(terminals);
  const issue = types.size === 0 && unknowns.length === 0 ? {
    ok: false,
    code: "invalid_literal",
    expected: [...literals.keys()]
  } : {
    ok: false,
    code: "invalid_type",
    expected: expectedTypes
  };
  const byLiteral = literals.size > 0 ? /* @__PURE__ */ new Map() : void 0;
  if (byLiteral) {
    for (const [literal2, options] of literals) {
      byLiteral.set(literal2, options.map((t) => t[MATCHER_SYMBOL]));
    }
  }
  const byType = types.size > 0 ? {} : void 0;
  if (byType) {
    for (const [type, options] of types) {
      byType[type] = options.map((t) => t[MATCHER_SYMBOL]);
    }
  }
  const optionalMatchers = optionals.map((t) => t[MATCHER_SYMBOL]);
  const unknownMatchers = unknowns.map((t) => t[MATCHER_SYMBOL]);
  return (value, flags) => {
    const options = flags & FLAG_MISSING_VALUE ? optionalMatchers : byType?.[toInputType(value)] ?? byLiteral?.get(value) ?? unknownMatchers;
    let count = 0;
    let issueTree = issue;
    for (let i = 0; i < options.length; i++) {
      const r = callMatcher(options[i], value, flags);
      if (r === void 0 || r.ok) {
        return r;
      }
      issueTree = count > 0 ? joinIssues(issueTree, r) : r;
      count++;
    }
    if (count > 1) {
      return { ok: false, code: "invalid_union", tree: issueTree };
    }
    return issueTree;
  };
}
var UnionType = class extends Type {
  constructor(options) {
    super();
    this.name = "union";
    this.options = options;
  }
  _toTerminals(func) {
    for (const option of this.options) {
      option._toTerminals(func);
    }
  }
  get [MATCHER_SYMBOL]() {
    const flattened = [];
    for (const option of this.options) {
      option._toTerminals((terminal) => {
        flattened.push({ root: option, terminal });
      });
    }
    const base = createUnionBaseMatcher(flattened);
    const object2 = createUnionObjectMatcher(flattened);
    return lazyProperty(this, MATCHER_SYMBOL, taggedMatcher(TAG_UNION, (v, f) => object2 !== void 0 && isObject(v) ? object2(v, f) : base(v, f)), false);
  }
};
var STRICT = Object.freeze({ mode: "strict" });
var STRIP = Object.freeze({ mode: "strip" });
var PASSTHROUGH = Object.freeze({ mode: "passthrough" });
function flagsToOptions(flags) {
  return flags & FLAG_FORBID_EXTRA_KEYS ? STRICT : flags & FLAG_STRIP_EXTRA_KEYS ? STRIP : PASSTHROUGH;
}
var TransformType = class _TransformType extends Type {
  constructor(transformed, transform) {
    super();
    this.name = "transform";
    this._transformed = transformed;
    this._transform = transform;
  }
  get [MATCHER_SYMBOL]() {
    const chain = [];
    let next = this;
    while (next instanceof _TransformType) {
      chain.push(next._transform);
      next = next._transformed;
    }
    chain.reverse();
    const matcher = next[MATCHER_SYMBOL];
    const undef = ok(void 0);
    return lazyProperty(this, MATCHER_SYMBOL, taggedMatcher(TAG_TRANSFORM, (v, flags) => {
      let result = callMatcher(matcher, v, flags);
      if (result !== void 0 && !result.ok) {
        return result;
      }
      let current;
      if (result !== void 0) {
        current = result.value;
      } else if (flags & FLAG_MISSING_VALUE) {
        current = void 0;
        result = undef;
      } else {
        current = v;
      }
      for (let i = 0; i < chain.length; i++) {
        const r = chain[i](current, flags);
        if (r !== void 0) {
          if (!r.ok) {
            return r;
          }
          current = r.value;
          result = r;
        }
      }
      return result;
    }), false);
  }
  _toTerminals(func) {
    this._transformed._toTerminals(func);
  }
};
var LazyType = class extends Type {
  constructor(definer) {
    super();
    this.name = "lazy";
    this._recursing = false;
    this._definer = definer;
  }
  get type() {
    return lazyProperty(this, "type", this._definer(), true);
  }
  get [MATCHER_SYMBOL]() {
    const matcher = taggedMatcher(TAG_OTHER, (value, flags) => {
      const typeMatcher = this.type[MATCHER_SYMBOL];
      matcher.tag = typeMatcher.tag;
      matcher.match = typeMatcher.match;
      lazyProperty(this, MATCHER_SYMBOL, typeMatcher, false);
      return callMatcher(typeMatcher, value, flags);
    });
    return matcher;
  }
  _toTerminals(func) {
    if (!this._recursing) {
      this._recursing = true;
      try {
        this.type._toTerminals(func);
      } finally {
        this._recursing = false;
      }
    }
  }
};
function singleton(name, tag, match) {
  const value = taggedMatcher(tag, match);
  class SimpleType extends Type {
    constructor() {
      super();
      this.name = name;
      this[MATCHER_SYMBOL] = value;
    }
  }
  const instance = new SimpleType();
  return /* @__NO_SIDE_EFFECTS__ */ () => instance;
}
var unknown = /* @__PURE__ */ singleton("unknown", TAG_UNKNOWN, () => void 0);
var string = /* @__PURE__ */ singleton("string", TAG_STRING, (v) => typeof v === "string" ? void 0 : ISSUE_EXPECTED_STRING);
var number = /* @__PURE__ */ singleton("number", TAG_NUMBER, (v) => typeof v === "number" ? void 0 : ISSUE_EXPECTED_NUMBER);
var boolean = /* @__PURE__ */ singleton("boolean", TAG_BOOLEAN, (v) => typeof v === "boolean" ? void 0 : ISSUE_EXPECTED_BOOLEAN);
var null_ = /* @__PURE__ */ singleton("null", TAG_NULL, (v) => v === null ? void 0 : ISSUE_EXPECTED_NULL);
var undefined_ = /* @__PURE__ */ singleton("undefined", TAG_UNDEFINED, (v) => v === void 0 ? void 0 : ISSUE_EXPECTED_UNDEFINED);
var LiteralType = class extends Type {
  constructor(value) {
    super();
    this.name = "literal";
    const issue = {
      ok: false,
      code: "invalid_literal",
      expected: [value]
    };
    this[MATCHER_SYMBOL] = taggedMatcher(TAG_LITERAL, (v) => v === value ? void 0 : issue);
    this.value = value;
  }
};
var literal = (value) => {
  return /* @__PURE__ */ new LiteralType(value);
};
var object = (obj) => {
  return /* @__PURE__ */ new ObjectType(obj, void 0);
};
var record = (valueType) => {
  return /* @__PURE__ */ new ObjectType({}, valueType ?? unknown());
};
var array = (item) => {
  return /* @__PURE__ */ new ArrayOrTupleType([], item ?? unknown(), []);
};
var union = (...options) => {
  return /* @__PURE__ */ new UnionType(options);
};
var lazy = (definer) => {
  return new LazyType(definer);
};

// node_modules/@atcute/identity/dist/typedefs.js
var FRAGMENT_RE = /^#[^#]+$/;
var MULTIBASE_RE = /^z[a-km-zA-HJ-NP-Z1-9]+$/;
var rfc3968UriSchema = string().assert((input) => {
  return URL.canParse(input);
}, `must be a url`);
var didRelativeUri = string().assert((input) => {
  return FRAGMENT_RE.test(input) || URL.canParse(input);
}, `must be a did relative uri`);
var multibaseString = string().assert((input) => {
  return MULTIBASE_RE.test(input);
}, `must be a base58 multibase`);
var didString = string().assert(isDid, `must be a did`);
var verificationMethod = object({
  id: didRelativeUri,
  type: string(),
  controller: didString,
  publicKeyMultibase: multibaseString.optional(),
  publicKeyJwk: record().optional()
}).chain((input) => {
  switch (input.type) {
    case "Multikey": {
      if (input.publicKeyMultibase === void 0) {
        return err({ message: `missing multikey`, path: ["publicKeyMultibase"] });
      }
      break;
    }
    case "EcdsaSecp256k1VerificationKey2019":
    case "EcdsaSecp256r1VerificationKey2019": {
      if (input.publicKeyMultibase === void 0) {
        return err({ message: `missing multibase key`, path: ["publicKeyMultibase"] });
      }
      break;
    }
  }
  return ok(input);
});
var service = object({
  // should've only been RFC3968, but did:plc uses relative URIs.
  id: didRelativeUri,
  type: union(string(), array(string())),
  serviceEndpoint: union(rfc3968UriSchema, record(rfc3968UriSchema), array(union(rfc3968UriSchema, record(rfc3968UriSchema))))
});
var didDocument = object({
  "@context": array(rfc3968UriSchema).optional(),
  id: didString,
  alsoKnownAs: array(rfc3968UriSchema).chain((input) => {
    for (let i = 0, len = input.length; i < len; i++) {
      const aka = input[i];
      for (let j = 0; j < i; j++) {
        if (aka === input[j]) {
          return err({
            message: `duplicate "${aka}" aka entry`,
            path: [i]
          });
        }
      }
    }
    return ok(input);
  }).optional(),
  verificationMethod: array(verificationMethod).chain((input) => {
    for (let i = 0, len = input.length; i < len; i++) {
      const method = input[i];
      const methodId = method.id;
      for (let j = 0; j < i; j++) {
        if (methodId === input[j].id) {
          return err({
            message: `duplicate "${methodId}" verification method`,
            path: [i, "id"]
          });
        }
      }
    }
    return ok(input);
  }).optional(),
  service: array(service).optional(),
  controller: union(didString, array(didString)).optional(),
  authentication: array(union(didRelativeUri, verificationMethod)).optional()
}).chain((input) => {
  const { id: did, service: services } = input;
  if (services?.length) {
    const len = services.length;
    const identifiers = new Array(len);
    for (let i = 0; i < len; i++) {
      const service2 = services[i];
      let id = service2.id;
      if (id[0] === "#") {
        id = did + id;
      }
      identifiers[i] = id;
    }
    for (let i = 0; i < len; i++) {
      const id = identifiers[i];
      for (let j = 0; j < i; j++) {
        if (id === identifiers[j]) {
          return err({
            message: `duplicate "${id}" service`,
            path: ["service", i, "id"]
          });
        }
      }
    }
  }
  return ok(input);
});

// node_modules/@atcute/identity/dist/utils.js
var isUrlParseSupported = "parse" in URL;
var isAtprotoServiceEndpoint = (input) => {
  let url = null;
  if (isUrlParseSupported) {
    url = URL.parse(input);
  } else {
    try {
      url = new URL(input);
    } catch {
    }
  }
  return url !== null && (url.protocol === "https:" || url.protocol === "http:") && url.pathname === "/" && url.search === "" && url.hash === "";
};
var getVerificationMaterial = (doc, id) => {
  const verificationMethods = doc.verificationMethod;
  if (!verificationMethods) {
    return;
  }
  const expectedId = `${doc.id}${id}`;
  for (let idx = 0, len = verificationMethods.length; idx < len; idx++) {
    const { id: id2, type, publicKeyMultibase } = verificationMethods[idx];
    if (id2 !== expectedId) {
      continue;
    }
    if (publicKeyMultibase === void 0) {
      continue;
    }
    return { type, publicKeyMultibase };
  }
};
var getAtprotoVerificationMaterial = (doc) => {
  return getVerificationMaterial(doc, "#atproto");
};
var getAtprotoServiceEndpoint = (doc, predicate) => {
  const services = doc.service;
  if (!services) {
    return;
  }
  for (let idx = 0, len = services.length; idx < len; idx++) {
    const { id, type, serviceEndpoint } = services[idx];
    if (id !== predicate.id && id !== doc.id + predicate.id) {
      continue;
    }
    if (predicate.type !== void 0) {
      if (Array.isArray(type)) {
        if (!type.includes(predicate.type)) {
          continue;
        }
      } else {
        if (type !== predicate.type) {
          continue;
        }
      }
    }
    if (typeof serviceEndpoint !== "string" || !isAtprotoServiceEndpoint(serviceEndpoint)) {
      continue;
    }
    return serviceEndpoint;
  }
};
var getPdsEndpoint = (doc) => {
  return getAtprotoServiceEndpoint(doc, {
    id: "#atproto_pds",
    type: "AtprotoPersonalDataServer"
  });
};

// node_modules/@atcute/identity/dist/methods/plc.js
var PLC_DID_RE = /^did:plc:([a-z2-7]{24})$/;
var isPlcDid = (input) => {
  return input.length === 32 && PLC_DID_RE.test(input);
};

// node_modules/@atcute/identity/dist/methods/web.js
var ATPROTO_WEB_DID_RE = /^did:web:([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(?:\.[a-zA-Z]{2,})|localhost(?:%3[aA]\d+)?)$/;
var isAtprotoWebDid = (input) => {
  return input.length >= 12 && ATPROTO_WEB_DID_RE.test(input);
};

// node_modules/@atcute/identity/dist/did.js
var isAtprotoDid = (input) => {
  return isPlcDid(input) || isAtprotoWebDid(input);
};
var extractDidMethod = (did) => {
  const isep = did.indexOf(":", 4);
  const method = did.slice(4, isep);
  return method;
};

// node_modules/@atcute/util-fetch/dist/pipeline.js
function pipe(...pipeline) {
  return pipeline.reduce(pipeTwo);
}
var pipeTwo = (first, second) => {
  return (input) => first(input).then(second);
};

// node_modules/@atcute/util-fetch/dist/errors.js
var FetchResponseError = class extends Error {
  name = "FetchResponseError";
};
var FailedResponseError = class extends FetchResponseError {
  response;
  name = "FailedResponseError";
  constructor(response) {
    super(`got http ${response.status}`);
    this.response = response;
  }
  get status() {
    return this.response.status;
  }
};
var ImproperContentTypeError = class extends FetchResponseError {
  contentType;
  name = "ImproperContentTypeError";
  constructor(contentType, reason) {
    super(reason);
    this.contentType = contentType;
  }
};
var ImproperContentLengthError = class extends FetchResponseError {
  expectedSize;
  actualSize;
  name = "ImproperContentLengthError";
  constructor(expectedSize, actualSize, reason) {
    super(reason);
    this.expectedSize = expectedSize;
    this.actualSize = actualSize;
  }
};
var ImproperResponseError = class extends FetchResponseError {
  name = "ImproperResponseError";
  constructor(reason, options) {
    super(reason, options);
  }
};

// node_modules/@atcute/util-fetch/dist/streams/size-limit.js
var SizeLimitStream = class extends TransformStream {
  constructor(maxSize) {
    let bytesRead = 0;
    super({
      transform(chunk, controller) {
        bytesRead += chunk.length;
        if (bytesRead > maxSize) {
          controller.error(new ImproperContentLengthError(maxSize, bytesRead, `response content-length too large`));
          return;
        }
        controller.enqueue(chunk);
      }
    });
  }
};

// node_modules/@atcute/util-fetch/dist/transformers.js
var isResponseOk = async (response) => {
  if (response.ok) {
    return response;
  }
  throw new FailedResponseError(response);
};
var readResponseAsText = (maxSize) => async (response) => {
  const text = await readResponse(response, maxSize);
  return { response, text };
};
var parseResponseAsJson = (typeRegex, maxSize) => async (response) => {
  await assertContentType(response, typeRegex);
  const text = await readResponse(response, maxSize);
  try {
    const json = JSON.parse(text);
    return { response, json };
  } catch (error) {
    throw new ImproperResponseError(`unexpected json data`, { cause: error });
  }
};
var validateJsonWith = (schema, options) => async (parsed) => {
  const json = schema.parse(parsed.json, options);
  return { response: parsed.response, json };
};
var assertContentType = async (response, typeRegex) => {
  const type = response.headers.get("content-type")?.split(";", 1)[0].trim();
  if (type === void 0) {
    if (response.body) {
      await response.body.cancel();
    }
    throw new ImproperContentTypeError(null, `missing response content-type`);
  }
  if (!typeRegex.test(type)) {
    if (response.body) {
      await response.body.cancel();
    }
    throw new ImproperContentTypeError(type, `unexpected response content-type`);
  }
};
var readResponse = async (response, maxSize) => {
  const rawSize = response.headers.get("content-length");
  if (rawSize !== null) {
    const size = Number(rawSize);
    if (!Number.isSafeInteger(size) || size <= 0) {
      response.body?.cancel();
      throw new ImproperContentLengthError(maxSize, null, `invalid response content-length`);
    }
    if (size > maxSize) {
      response.body?.cancel();
      throw new ImproperContentLengthError(maxSize, size, `response content-length too large`);
    }
  }
  const stream = response.body.pipeThrough(new SizeLimitStream(maxSize)).pipeThrough(new TextDecoderStream());
  let text = "";
  for await (const chunk of createStreamIterator(stream)) {
    text += chunk;
  }
  return text;
};
var createStreamIterator = Symbol.asyncIterator in ReadableStream.prototype ? (stream) => stream[Symbol.asyncIterator]() : (stream) => {
  const reader = stream.getReader();
  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    next() {
      return reader.read();
    },
    async return() {
      await reader.cancel();
      return { done: true, value: void 0 };
    },
    async throw(error) {
      await reader.cancel(error);
      return { done: true, value: void 0 };
    }
  };
};

// node_modules/@atcute/lexicon-resolver/dist/errors.js
var LexiconAuthorityResolutionError = class extends Error {
  name = "LexiconAuthorityResolutionError";
};
var AuthorityNotFoundError = class extends LexiconAuthorityResolutionError {
  name = "AuthorityNotFoundError";
  nsid;
  constructor(nsid2) {
    super(`lexicon authority not found; nsid=${nsid2}`);
    this.nsid = nsid2;
  }
};
var FailedAuthorityResolutionError = class extends LexiconAuthorityResolutionError {
  name = "FailedAuthorityResolutionError";
  nsid;
  constructor(nsid2, options) {
    super(`failed to resolve lexicon authority; nsid=${nsid2}`, options);
    this.nsid = nsid2;
  }
};
var InvalidResolvedAuthorityError = class extends LexiconAuthorityResolutionError {
  name = "InvalidResolvedAuthorityError";
  nsid;
  did;
  constructor(nsid2, did) {
    super(`lexicon authority returned invalid did; nsid=${nsid2}; did=${did}`);
    this.nsid = nsid2;
    this.did = did;
  }
};
var AmbiguousAuthorityError = class extends LexiconAuthorityResolutionError {
  name = "AmbiguousAuthorityError";
  nsid;
  constructor(nsid2) {
    super(`lexicon authority returned multiple did values; nsid=${nsid2}`);
    this.nsid = nsid2;
  }
};
var LexiconResolutionError = class extends Error {
  name = "LexiconResolutionError";
};
var FailedLexiconResolutionError = class extends LexiconResolutionError {
  name = "FailedLexiconResolutionError";
  nsid;
  constructor(nsid2, options) {
    super(`failed to resolve lexicon; nsid=${nsid2}`, options);
    this.nsid = nsid2;
  }
};
var InvalidLexiconSchemaError = class extends LexiconResolutionError {
  name = "InvalidLexiconSchemaError";
  nsid;
  constructor(nsid2, options) {
    super(`invalid lexicon schema; nsid=${nsid2}`, options);
    this.nsid = nsid2;
  }
};
var InvalidLexiconProofError = class extends LexiconResolutionError {
  name = "InvalidLexiconProofError";
  nsid;
  constructor(nsid2, options) {
    super(`invalid lexicon record proof; nsid=${nsid2}`, options);
    this.nsid = nsid2;
  }
};

// node_modules/@atcute/lexicon-resolver/dist/utils.js
var nsidToLookupDomain = (nsid2) => {
  const segments = nsid2.split(".");
  return segments.slice(0, -1).reverse().join(".");
};

// node_modules/@atcute/crypto/dist/keypairs/secp256k1-node.js
var import_node_crypto2 = require("node:crypto");

// node_modules/@atcute/multibase/dist/bases/base16-node.js
var import_node_buffer2 = require("node:buffer");
var _hexSlice = /* @__PURE__ */ (() => import_node_buffer2.Buffer.prototype.hexSlice)();
var toBase16 = (bytes) => {
  return _hexSlice.call(bytes);
};

// node_modules/@atcute/multibase/dist/bases/base64-node.js
var import_node_buffer3 = require("node:buffer");
var _base64Slice = /* @__PURE__ */ (() => import_node_buffer3.Buffer.prototype.base64Slice)();
var _base64Write = /* @__PURE__ */ (() => import_node_buffer3.Buffer.prototype.base64Write)();
var getBase64ByteLength = (str, padded) => {
  let length = str.length;
  if (padded) {
    if (str.charCodeAt(length - 1) === 61) {
      length--;
    }
    if (length > 1 && str.charCodeAt(length - 1) === 61) {
      length--;
    }
  }
  return length * 3 >>> 2;
};
var trimBase64Padding = (str) => {
  const end = str.length - 1;
  if (str.charCodeAt(end) !== 61) {
    return str;
  }
  if (str.charCodeAt(end - 1) !== 61) {
    return str.slice(0, end);
  }
  return str.slice(0, end - 1);
};
var fromBase64 = (str) => {
  const length = getBase64ByteLength(str, false);
  const bytes = allocUnsafe(length);
  const written = _base64Write.call(bytes, str);
  return length > written ? bytes.subarray(0, written) : bytes;
};
var toBase64 = (bytes) => {
  return trimBase64Padding(_base64Slice.call(bytes));
};

// node_modules/@atcute/multibase/dist/bases/base32-encode.js
var ALPHABET = "abcdefghijklmnopqrstuvwxyz234567";
var _cc = /* @__PURE__ */ (() => {
  const t = new Uint8Array(32);
  for (let i = 0; i < 32; i++) {
    t[i] = ALPHABET.charCodeAt(i);
  }
  return t;
})();
var _fromCharCode2 = String.fromCharCode;
var toBase32 = (bytes) => {
  const len = bytes.length;
  const full = len / 5 | 0;
  const rem = len - full * 5;
  const cc = _cc;
  let str = "";
  let ip = 0;
  const pairs = full / 2 | 0;
  for (let g = 0; g < pairs; g++) {
    const a0 = bytes[ip], a1 = bytes[ip + 1], a2 = bytes[ip + 2], a3 = bytes[ip + 3], a4 = bytes[ip + 4];
    const b0 = bytes[ip + 5], b1 = bytes[ip + 6], b2 = bytes[ip + 7], b3 = bytes[ip + 8], b4 = bytes[ip + 9];
    str += _fromCharCode2(cc[a0 >>> 3], cc[(a0 << 2 | a1 >>> 6) & 31], cc[a1 >>> 1 & 31], cc[(a1 << 4 | a2 >>> 4) & 31], cc[(a2 << 1 | a3 >>> 7) & 31], cc[a3 >>> 2 & 31], cc[(a3 << 3 | a4 >>> 5) & 31], cc[a4 & 31], cc[b0 >>> 3], cc[(b0 << 2 | b1 >>> 6) & 31], cc[b1 >>> 1 & 31], cc[(b1 << 4 | b2 >>> 4) & 31], cc[(b2 << 1 | b3 >>> 7) & 31], cc[b3 >>> 2 & 31], cc[(b3 << 3 | b4 >>> 5) & 31], cc[b4 & 31]);
    ip += 10;
  }
  if (full & 1) {
    const b0 = bytes[ip], b1 = bytes[ip + 1], b2 = bytes[ip + 2], b3 = bytes[ip + 3], b4 = bytes[ip + 4];
    str += _fromCharCode2(cc[b0 >>> 3], cc[(b0 << 2 | b1 >>> 6) & 31], cc[b1 >>> 1 & 31], cc[(b1 << 4 | b2 >>> 4) & 31], cc[(b2 << 1 | b3 >>> 7) & 31], cc[b3 >>> 2 & 31], cc[(b3 << 3 | b4 >>> 5) & 31], cc[b4 & 31]);
    ip += 5;
  }
  if (rem > 0) {
    let buffer = 0;
    let bits = 0;
    for (let i = ip; i < len; i++) {
      buffer = buffer << 8 | bytes[i];
      bits += 8;
    }
    while (bits >= 5) {
      bits -= 5;
      str += _fromCharCode2(cc[buffer >>> bits & 31]);
    }
    if (bits > 0) {
      str += _fromCharCode2(cc[buffer << 5 - bits & 31]);
    }
  }
  return str;
};

// node_modules/@atcute/multibase/dist/bases/base32.js
var ALPHABET2 = "abcdefghijklmnopqrstuvwxyz234567";
var _decodeLut = /* @__PURE__ */ (() => {
  const t = new Uint8Array(128).fill(255);
  for (let i = 0; i < 32; i++) {
    t[ALPHABET2.charCodeAt(i)] = i;
  }
  return t;
})();
var fromBase32 = (str) => {
  const end = str.length;
  const bytes = allocUnsafe(end * 5 / 8 | 0);
  let written = 0;
  let i = 0;
  const fullGroups = end - end % 8;
  for (; i < fullGroups; i += 8) {
    const k0 = str.charCodeAt(i);
    const k1 = str.charCodeAt(i + 1);
    const k2 = str.charCodeAt(i + 2);
    const k3 = str.charCodeAt(i + 3);
    const k4 = str.charCodeAt(i + 4);
    const k5 = str.charCodeAt(i + 5);
    const k6 = str.charCodeAt(i + 6);
    const k7 = str.charCodeAt(i + 7);
    if ((k0 | k1 | k2 | k3 | k4 | k5 | k6 | k7) & ~127) {
      throw new SyntaxError(`invalid base string`);
    }
    const c0 = _decodeLut[k0];
    const c1 = _decodeLut[k1];
    const c2 = _decodeLut[k2];
    const c3 = _decodeLut[k3];
    const c4 = _decodeLut[k4];
    const c5 = _decodeLut[k5];
    const c6 = _decodeLut[k6];
    const c7 = _decodeLut[k7];
    if ((c0 | c1 | c2 | c3 | c4 | c5 | c6 | c7) & 224) {
      throw new SyntaxError(`invalid base string`);
    }
    bytes[written] = c0 << 3 | c1 >>> 2;
    bytes[written + 1] = (c1 << 6 | c2 << 1 | c3 >>> 4) & 255;
    bytes[written + 2] = (c3 << 4 | c4 >>> 1) & 255;
    bytes[written + 3] = (c4 << 7 | c5 << 2 | c6 >>> 3) & 255;
    bytes[written + 4] = (c6 << 5 | c7) & 255;
    written += 5;
  }
  if (i < end) {
    let bits = 0;
    let buffer = 0;
    for (; i < end; ++i) {
      const code = str.charCodeAt(i);
      const value = code < 128 ? _decodeLut[code] : 255;
      if (value & 224) {
        throw new SyntaxError(`invalid base string`);
      }
      buffer = buffer << 5 | value;
      bits += 5;
      if (bits >= 8) {
        bits -= 8;
        bytes[written++] = 255 & buffer >> bits;
      }
    }
    if (bits >= 5 || (255 & buffer << 8 - bits) !== 0) {
      throw new SyntaxError(`unexpected end of data`);
    }
  }
  return bytes;
};

// node_modules/@atcute/multibase/dist/utils.js
var createBtcBaseEncode = (alphabet) => {
  if (alphabet.length >= 255) {
    throw new RangeError(`alphabet too long`);
  }
  const BASE = alphabet.length;
  const LEADER = alphabet.charAt(0);
  const iFACTOR = Math.log(256) / Math.log(BASE);
  return (source) => {
    if (source.length === 0) {
      return "";
    }
    let zeroes = 0;
    let length = 0;
    let pbegin = 0;
    const pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    const dataLen = pend - pbegin;
    const size = dataLen * iFACTOR + 1 >>> 0;
    const bN = alloc(size);
    {
      const rem = dataLen % 3;
      const tripleEnd = pend - rem;
      while (pbegin < tripleEnd) {
        let carry = source[pbegin] << 16 | source[pbegin + 1] << 8 | source[pbegin + 2];
        let i = 0;
        for (let it1 = size - 1; (carry !== 0 || i < length) && it1 !== -1; it1--, i++) {
          carry = carry + 16777216 * bN[it1];
          const q = carry / BASE | 0;
          bN[it1] = carry - q * BASE;
          carry = q;
        }
        length = i;
        pbegin += 3;
      }
    }
    while (pbegin !== pend) {
      let carry = source[pbegin];
      let i = 0;
      for (let it1 = size - 1; (carry !== 0 || i < length) && it1 !== -1; it1--, i++) {
        carry = carry + 256 * bN[it1];
        const q = carry / BASE | 0;
        bN[it1] = carry - q * BASE;
        carry = q;
      }
      length = i;
      pbegin++;
    }
    let it2 = size - length;
    while (it2 !== size && bN[it2] === 0) {
      it2++;
    }
    let str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += alphabet.charAt(bN[it2]);
    }
    return str;
  };
};
var createBtcBaseDecode = (alphabet) => {
  if (alphabet.length >= 255) {
    throw new RangeError(`alphabet too long`);
  }
  const BASE_MAP = new Uint8Array(128).fill(255);
  for (let i = 0; i < alphabet.length; i++) {
    const xc = alphabet.charCodeAt(i);
    if (xc >= 128) {
      throw new RangeError(`non-ASCII character in alphabet`);
    }
    if (BASE_MAP[xc] !== 255) {
      throw new RangeError(`${alphabet[i]} is ambiguous`);
    }
    BASE_MAP[xc] = i;
  }
  const BASE = alphabet.length;
  const BASE2 = BASE * BASE;
  const LEADER = alphabet.charAt(0);
  const FACTOR = Math.log(BASE) / Math.log(256);
  return (source) => {
    if (source.length === 0) {
      return allocUnsafe(0);
    }
    let psz = 0;
    let zeroes = 0;
    let length = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    const remaining = source.length - psz;
    const size = remaining * FACTOR + 1 >>> 0;
    const b256 = alloc(size);
    {
      const rem = remaining & 1;
      const pairEnd = source.length - rem;
      while (psz < pairEnd) {
        const c0 = BASE_MAP[source.charCodeAt(psz)];
        const c1 = BASE_MAP[source.charCodeAt(psz + 1)];
        if (c0 === 255 || c1 === 255) {
          throw new Error(`invalid string`);
        }
        let carry = c0 * BASE + c1;
        let i = 0;
        for (let it3 = size - 1; (carry !== 0 || i < length) && it3 !== -1; it3--, i++) {
          carry += BASE2 * b256[it3];
          b256[it3] = carry;
          carry >>>= 8;
        }
        if (carry !== 0) {
          throw new Error("non-zero carry");
        }
        length = i;
        psz += 2;
      }
    }
    if (psz < source.length) {
      let carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        throw new Error(`invalid string`);
      }
      let i = 0;
      for (let it3 = size - 1; (carry !== 0 || i < length) && it3 !== -1; it3--, i++) {
        carry += BASE * b256[it3];
        b256[it3] = carry;
        carry >>>= 8;
      }
      if (carry !== 0) {
        throw new Error("non-zero carry");
      }
      length = i;
    }
    let it4 = size - length;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    if (it4 === zeroes) {
      return b256;
    }
    const vch = allocUnsafe(zeroes + (size - it4));
    vch.fill(0, 0, zeroes);
    vch.set(b256.subarray(it4), zeroes);
    return vch;
  };
};

// node_modules/@atcute/multibase/dist/bases/base58.js
var BASE58BTC_CHARSET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
var fromBase58Btc = /* @__PURE__ */ createBtcBaseDecode(BASE58BTC_CHARSET);
var toBase58Btc = /* @__PURE__ */ createBtcBaseEncode(BASE58BTC_CHARSET);

// node_modules/@atcute/crypto/dist/utils.js
var getSignatureS = (sig) => {
  let len;
  let s = 0n;
  for (let i = 1; i <= (len = sig.length) >> 1; i++) {
    s |= BigInt(sig[len - i]) << BigInt(8 * (i - 1));
  }
  return s;
};
var isSignatureNormalized = (sig, curveOrder) => {
  return getSignatureS(sig) <= curveOrder >> 1n;
};
var isCompressedPoint = (coords) => {
  return coords[0] === 2 || coords[0] === 3;
};
var isUncompressedPoint = (coords) => {
  return coords[0] === 4;
};
var compressPoint = (coords) => {
  assertType(isUncompressedPoint(coords), `not an uncompressed point`);
  const maxIdx = coords.length - 1;
  const n = maxIdx >> 1;
  const compressed = coords.slice(0, n + 1);
  compressed[0] = 2 + (coords[maxIdx] & 1);
  return compressed;
};
var CHALLENGE = new Uint8Array([98, 110, 117, 121, 32, 114, 32, 113, 116, 32, 58, 51]);
var toMultikey = (prefix, keyBytes) => {
  const encoded = toBase58Btc(concat([prefix, keyBytes]));
  return `z${encoded}`;
};
var assertType = (condition, message) => {
  if (!condition) {
    throw new TypeError(message);
  }
};
var assertSyntax = (condition, message) => {
  if (!condition) {
    throw new SyntaxError(message);
  }
};
var assertUnreachable = (_, message) => {
  throw new Error(message);
};

// node_modules/@atcute/crypto/dist/keypairs/secp256k1-node.js
var SECP256K1_PUBLIC_PREFIX = Uint8Array.from([231, 1]);
var SECP256K1_PRIVATE_PREFIX = Uint8Array.from([129, 38]);
var SECP256K1_CURVE_ORDER = 0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141n;
var ASN1_ALGORITHM_IDENTIFIER = Uint8Array.from([
  ...[
    /* SEQ */
    48,
    /* len */
    16
  ],
  // AlgorithmIdentifier
  /**/
  ...[
    /* OID */
    6,
    /* len */
    7
  ],
  // {iso(1) member-body(2) us(840) ansi-x962(10045) keyType(2) ecPublicKey(1)} -- https://datatracker.ietf.org/doc/html/rfc5753#section-7.1.2
  /******/
  ...[
    /* 1.2.840.10045.2.1 (ecPublicKey) */
    42,
    134,
    72,
    206,
    61,
    2,
    1
  ],
  /**/
  ...[
    /* OID */
    6,
    /* len */
    5
  ],
  // {iso(1) identified-organization(3) certicom(132) curve(0) ansip256k1(10)} -- SEC 2, ver. 2.0, § A.2 https://www.secg.org/sec2-v2.pdf
  /******/
  ...[
    /* 1.3.132.0.10 (ansip256k1) */
    43,
    129,
    4,
    0,
    10
  ]
]);
var PKCS8_PRIVATE_KEY_PREFIX = Uint8Array.from([
  ...[
    /* SEQ */
    48,
    /* len */
    62
  ],
  // PrivateKeyInfo
  /**/
  ...[
    /* INT */
    2,
    /* len */
    1,
    /* 0 */
    0
  ],
  // Version
  /**/
  ...ASN1_ALGORITHM_IDENTIFIER,
  // AlgorithmIdentifier
  /**/
  ...[
    /* OCT_STR */
    4,
    /* len */
    39
  ],
  // PrivateKey
  /******/
  ...[
    /* SEQ */
    48,
    /* len */
    37
  ],
  /**********/
  ...[
    /* INT */
    2,
    /* len */
    1,
    /* 1 */
    1
  ],
  /**********/
  ...[
    /* OCT_STR */
    4,
    /* len: 32 */
    32
    /* ... */
  ]
]);
var SPKI_PREFIX = Uint8Array.from([
  ...[
    /* SEQ */
    48,
    /* len */
    54
  ],
  // SubjectPublicKeyInfo
  /**/
  ...ASN1_ALGORITHM_IDENTIFIER,
  // AlgorithmIdentifier
  /**/
  ...[
    /* BIT_STR */
    3,
    /* len: 33 */
    34,
    0
    /* ... */
  ]
  // PublicKey
]);
var NodeSecp256k1PublicKey = class _NodeSecp256k1PublicKey {
  type = "secp256k1";
  jwtAlg = "ES256K";
  /** @internal */
  _publicKey;
  /** @internal */
  constructor(publicKey) {
    this._publicKey = publicKey;
  }
  static async importRaw(publicKeyBytes) {
    const publicKey = (0, import_node_crypto2.createPublicKey)({
      key: Buffer.concat([SPKI_PREFIX, publicKeyBytes]),
      format: "der",
      type: "spki"
    });
    return new _NodeSecp256k1PublicKey(publicKey);
  }
  async verify(sig, data, options) {
    if (!options?.allowMalleableSig && !isSignatureNormalized(sig, SECP256K1_CURVE_ORDER)) {
      return false;
    }
    return (0, import_node_crypto2.verify)("SHA256", data, { key: this._publicKey, dsaEncoding: "ieee-p1363" }, sig);
  }
  async exportPublicKey(format) {
    const publicKey = this._publicKey;
    if (format === "jwk") {
      return publicKey.export({ format: "jwk" });
    }
    const publicKeySpki = publicKey.export({ format: "der", type: "spki" });
    const rawPublicKey = new Uint8Array(publicKeySpki.buffer, SPKI_PREFIX.length);
    const publicKeyBytes = compressPoint(rawPublicKey);
    switch (format) {
      case "did": {
        return `did:key:${toMultikey(SECP256K1_PUBLIC_PREFIX, publicKeyBytes)}`;
      }
      case "multikey": {
        return toMultikey(SECP256K1_PUBLIC_PREFIX, publicKeyBytes);
      }
      case "raw": {
        return publicKeyBytes;
      }
      case "rawHex": {
        return toBase16(publicKeyBytes);
      }
    }
    assertUnreachable(format, `unknown "${format}" export format`);
  }
};

// node_modules/@atcute/crypto/dist/utils-p256.js
var P256_P = 0xffffffff00000001000000000000000000000000ffffffffffffffffffffffffn;
var P256_A = 0xffffffff00000001000000000000000000000000fffffffffffffffffffffffcn;
var P256_B = 0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604bn;
var P256_N = 0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551n;
var P256_P_PLUS_ONE_OVER_4 = (P256_P + 1n) / 4n;
var BEu8toBigInt = (buf) => {
  return buf.reduce((a, n, i) => a + (BigInt(n) << BigInt(8 * (buf.length - i - 1))), 0n);
};
var BigIntToBEu8 = (n, length) => {
  return Uint8Array.from(Array.from({ length }, (_, i) => Number(BigInt.asUintN(8, n >> BigInt((length - i - 1) * 8)))));
};
var pow16mod = (a, n) => {
  a = a * a % n;
  a = a * a % n;
  a = a * a % n;
  a = a * a % n;
  return a;
};
var powmod = (a, b, n) => {
  const a_lut = [1n];
  for (let i = 0; i < 15; i++) {
    a_lut.push(a_lut[i] * a % n);
  }
  return Array.from(b.toString(16)).reduce((acc, bi) => pow16mod(acc, n) * a_lut[parseInt(bi, 16)] % n, 1n);
};
var uncompressP256Point = (coords) => {
  assertType(isCompressedPoint(coords), `not a compressed point`);
  assertType(coords.length === 33, `invalid compressed point length`);
  const x = BEu8toBigInt(coords.subarray(1));
  const y_squared = (x ** 3n + P256_A * x + P256_B) % P256_P;
  let y = powmod(y_squared, P256_P_PLUS_ONE_OVER_4, P256_P);
  assertType(y * y % P256_P === y_squared, `invalid curve point`);
  if ((coords[0] ^ Number(BigInt.asUintN(1, y))) & 1) {
    y = P256_P - y;
  }
  const res = new Uint8Array(1 + 32 + 32);
  res[0] = 4;
  res.set(BigIntToBEu8(x, 32), 1);
  res.set(BigIntToBEu8(y, 32), 1 + 32);
  return res;
};

// node_modules/@atcute/crypto/dist/keypairs/p256.js
var P256_PUBLIC_PREFIX = Uint8Array.from([128, 36]);
var P256_PRIVATE_PREFIX = Uint8Array.from([134, 38]);
var ECDSA_ALG = {
  name: "ECDSA",
  namedCurve: "P-256",
  hash: "SHA-256"
};
var IS_COMPRESSED_POINT_SUPPORTED;
var importPublicKey = async (publicKeyBytes, extractable, usages) => {
  if (IS_COMPRESSED_POINT_SUPPORTED === true || isUncompressedPoint(publicKeyBytes)) {
    return crypto.subtle.importKey("raw", publicKeyBytes, ECDSA_ALG, extractable, usages);
  }
  if (IS_COMPRESSED_POINT_SUPPORTED === false) {
    return crypto.subtle.importKey("raw", uncompressP256Point(publicKeyBytes), ECDSA_ALG, extractable, usages);
  }
  try {
    const key = await crypto.subtle.importKey("raw", publicKeyBytes, ECDSA_ALG, extractable, usages);
    IS_COMPRESSED_POINT_SUPPORTED = true;
    return key;
  } catch {
    const key = await crypto.subtle.importKey("raw", uncompressP256Point(publicKeyBytes), ECDSA_ALG, extractable, usages);
    IS_COMPRESSED_POINT_SUPPORTED = false;
    return key;
  }
};
var ASN1_ALGORITHM_IDENTIFIER2 = Uint8Array.from([
  ...[
    /* SEQ */
    48,
    /* len */
    19
  ],
  // AlgorithmIdentifier
  /**/
  ...[
    /* OID */
    6,
    /* len */
    7
  ],
  // {iso(1) member-body(2) us(840) ansi-x962(10045) keyType(2) ecPublicKey(1)} -- https://datatracker.ietf.org/doc/html/rfc5753#section-7.1.2
  /******/
  ...[
    /* 1.2.840.10045.2.1 (ecPublicKey) */
    42,
    134,
    72,
    206,
    61,
    2,
    1
  ],
  /**/
  ...[
    /* OID */
    6,
    /* len */
    8
  ],
  // {iso(1) member-body(2) us(840) ansi-x962(10045) curves(3) prime(1) prime256v1(7)} -- https://datatracker.ietf.org/doc/html/rfc5480#section-2.1.1.1
  /******/
  ...[
    /* 1.2.840.10045.3.1.7 (prime256v1) */
    42,
    134,
    72,
    206,
    61,
    3,
    1,
    7
  ]
]);
var PKCS8_PRIVATE_KEY_PREFIX2 = Uint8Array.from([
  ...[
    /* SEQ */
    48,
    /* len */
    65
  ],
  // PrivateKeyInfo
  /**/
  ...[
    /* INT */
    2,
    /* len */
    1,
    /* 0 */
    0
  ],
  // Version
  /**/
  ...ASN1_ALGORITHM_IDENTIFIER2,
  // AlgorithmIdentifier
  /**/
  ...[
    /* OCT_STR */
    4,
    /* len */
    39
  ],
  // PrivateKey
  /******/
  ...[
    /* SEQ */
    48,
    /* len */
    37
  ],
  /**********/
  ...[
    /* INT */
    2,
    /* len */
    1,
    /* 1 */
    1
  ],
  /**********/
  ...[
    /* OCT_STR */
    4,
    /* len: 32 */
    32
    /* ... */
  ]
]);
var P256PublicKey = class _P256PublicKey {
  type = "p256";
  jwtAlg = "ES256";
  /** @internal */
  _publicKey;
  /** @internal */
  constructor(publicKey) {
    this._publicKey = publicKey;
  }
  static async importRaw(publicKeyBytes) {
    const imported = await importPublicKey(publicKeyBytes, true, ["verify"]);
    return new _P256PublicKey(imported);
  }
  static async importCryptoKey(publicKey) {
    assertType(publicKey.algorithm.namedCurve === "P-256", "not an ECDSA P-256 key");
    assertType(publicKey.type === "public", "not a public key");
    assertType(publicKey.extractable, "key must be extractable");
    return new _P256PublicKey(publicKey);
  }
  async verify(sig, data, options) {
    if (sig.length !== 64) {
      return false;
    }
    if (!options?.allowMalleableSig && !isSignatureNormalized(sig, P256_N)) {
      return false;
    }
    return await crypto.subtle.verify(ECDSA_ALG, this._publicKey, sig, data);
  }
  async exportPublicKey(format) {
    if (format === "jwk") {
      return await crypto.subtle.exportKey("jwk", this._publicKey);
    }
    const buffer = await crypto.subtle.exportKey("raw", this._publicKey);
    const publicKeyBytes = compressPoint(new Uint8Array(buffer));
    switch (format) {
      case "did": {
        return `did:key:${toMultikey(P256_PUBLIC_PREFIX, publicKeyBytes)}`;
      }
      case "multikey": {
        return toMultikey(P256_PUBLIC_PREFIX, publicKeyBytes);
      }
      case "raw": {
        return publicKeyBytes;
      }
      case "rawHex": {
        return toBase16(publicKeyBytes);
      }
    }
    assertUnreachable(format, `unknown "${format}" export format`);
  }
};

// node_modules/@atcute/crypto/dist/multibase.js
var extractMultibase = (key) => {
  assertSyntax(key.length >= 2 && key[0] === "z", `not a multibase base58btc string`);
  const bytes = fromBase58Btc(key.slice(1));
  return bytes;
};
var parsePublicMultikey = (key) => {
  const bytes = extractMultibase(key);
  assertSyntax(bytes.length >= 3, `multikey too short`);
  const type = bytes[0] << 8 | bytes[1];
  const publicKey = bytes.subarray(2);
  switch (type) {
    case 32804: {
      return { type: "p256", jwtAlg: "ES256", publicKeyBytes: publicKey };
    }
    case 59137: {
      return { type: "secp256k1", jwtAlg: "ES256K", publicKeyBytes: publicKey };
    }
  }
  assertType(false, `unsupported key type (0x${type.toString(16).padStart(4, "0")})`);
};
var getPublicKeyFromDidController = (controller) => {
  const publicKeyMultibase = controller.publicKeyMultibase;
  switch (controller.type) {
    case "Multikey": {
      return parsePublicMultikey(publicKeyMultibase);
    }
    case "EcdsaSecp256r1VerificationKey2019": {
      return { type: "p256", jwtAlg: "ES256", publicKeyBytes: extractMultibase(publicKeyMultibase) };
    }
    case "EcdsaSecp256k1VerificationKey2019": {
      return { type: "secp256k1", jwtAlg: "ES256K", publicKeyBytes: extractMultibase(publicKeyMultibase) };
    }
  }
  assertType(false, `unsupported controller type (${controller.type})`);
};

// node_modules/@atcute/lexicon-doc/dist/typedefs.js
var integer = number().assert((input) => input >= 0 && Number.isSafeInteger(input), `expected non-negative integer`);
var nsid = string().assert(isNsid, `expected valid nsid`);
var lexBoolean = object({
  type: literal("boolean"),
  description: string().optional(),
  default: boolean().optional(),
  const: boolean().optional()
});
var lexInteger = object({
  type: literal("integer"),
  description: string().optional(),
  default: integer.optional(),
  minimum: integer.optional(),
  maximum: integer.optional(),
  enum: array(integer).optional(),
  const: integer.optional()
});
var lexStringFormat = union(literal("datetime"), literal("uri"), literal("at-uri"), literal("did"), literal("handle"), literal("at-identifier"), literal("nsid"), literal("cid"), literal("language"), literal("tid"), literal("record-key"));
var lexString = object({
  type: literal("string"),
  format: lexStringFormat.optional(),
  description: string().optional(),
  default: string().optional(),
  minLength: integer.optional(),
  maxLength: integer.optional(),
  minGraphemes: integer.optional(),
  maxGraphemes: integer.optional(),
  enum: array(string()).optional(),
  const: string().optional(),
  knownValues: array(string()).optional()
});
var lexBytes = object({
  type: literal("bytes"),
  description: string().optional(),
  minLength: integer.optional(),
  maxLength: integer.optional()
});
var lexCidLink = object({
  type: literal("cid-link"),
  description: string().optional()
});
var lexBlob = object({
  type: literal("blob"),
  description: string().optional(),
  accept: array(string()).optional(),
  maxSize: integer.optional()
});
var lexPrimitive = union(lexBoolean, lexInteger, lexString);
var lexConcrete = union(lexBoolean, lexInteger, lexString, lexBytes, lexCidLink, lexBlob);
var lexToken = object({
  type: literal("token"),
  description: string().optional()
});
var lexRef = object({
  type: literal("ref"),
  description: string().optional(),
  ref: string()
});
var lexRefUnion = object({
  type: literal("union"),
  description: string().optional(),
  refs: array(string()),
  closed: boolean().optional()
});
var lexUnknown = object({
  type: literal("unknown"),
  description: string().optional()
});
var lexRefVariant = union(lexRef, lexRefUnion);
var lexMeta = union(lexToken, lexRef, lexRefUnion, lexUnknown);
var lexDefinableField = lazy(() => {
  return union(lexConcrete, lexRef, lexRefUnion, lexUnknown, lexArray);
});
var lexField = lazy(() => {
  return union(lexConcrete, lexMeta, lexContainer);
});
var lexArray = object({
  type: literal("array"),
  description: string().optional(),
  items: lexDefinableField,
  minLength: integer.optional(),
  maxLength: integer.optional()
});
var lexPrimitiveArray = object({
  type: literal("array"),
  description: string().optional(),
  items: lexPrimitive,
  minLength: integer.optional(),
  maxLength: integer.optional()
});
var lexObject = object({
  type: literal("object"),
  description: string().optional(),
  required: array(string()).optional(),
  nullable: array(string()).optional(),
  properties: record(lexDefinableField).optional()
});
var lexContainer = union(lexArray, lexObject);
var lexXrpcBody = object({
  description: string().optional(),
  encoding: string(),
  schema: union(lexRefVariant, lexObject).optional()
});
var lexXrpcSubscriptionMessage = object({
  description: string().optional(),
  schema: lexRefUnion.optional()
});
var lexXrpcError = object({
  name: string(),
  description: string().optional()
});
var lexLang = record(union(undefined_(), string()));
var lexXrpcParameters = object({
  type: literal("params"),
  description: string().optional(),
  required: array(string()).optional(),
  properties: record(union(lexPrimitive, lexPrimitiveArray)).optional()
});
var lexPermission = object({
  type: literal("permission"),
  resource: string()
}).rest(union(array(union(string(), integer, boolean())), string(), integer, boolean(), undefined_()));
var lexRecord = object({
  type: literal("record"),
  description: string().optional(),
  key: union(literal("tid"), literal("nsid"), literal("any"), string().assert((input) => input.startsWith("literal:"), {
    message: `invalid literal key`
  })).optional(),
  record: lexObject
});
var lexXrpcQuery = object({
  type: literal("query"),
  description: string().optional(),
  parameters: lexXrpcParameters.optional(),
  output: lexXrpcBody.optional(),
  errors: array(lexXrpcError).optional()
});
var lexXrpcProcedure = object({
  type: literal("procedure"),
  description: string().optional(),
  parameters: lexXrpcParameters.optional(),
  input: lexXrpcBody.optional(),
  output: lexXrpcBody.optional(),
  errors: array(lexXrpcError).optional()
});
var lexXrpcSubscription = object({
  type: literal("subscription"),
  description: string().optional(),
  parameters: lexXrpcParameters.optional(),
  message: lexXrpcSubscriptionMessage.optional(),
  errors: array(lexXrpcError).optional()
});
var lexPermissionSet = object({
  type: literal("permission-set"),
  description: string().optional(),
  title: string().optional(),
  "title:lang": lexLang.optional(),
  detail: string().optional(),
  "detail:lang": lexLang.optional(),
  permissions: array(lexPermission)
});
var lexPrimary = union(lexRecord, lexXrpcQuery, lexXrpcProcedure, lexXrpcSubscription, lexPermissionSet);
var lexUserType = union(lexPrimary, lexConcrete, lexToken, lexUnknown, lexContainer);
var lexiconDoc = object({
  lexicon: literal(1),
  id: nsid,
  revision: integer.optional(),
  description: string().optional(),
  defs: record(lexUserType)
});

// node_modules/@atcute/cid/dist/codec.js
var CID_VERSION = 1;
var HASH_SHA256 = 18;
var CODEC_RAW = 85;
var CODEC_DCBOR = 113;
var fromDigest = (codec, digest) => {
  if (digest.length !== 32) {
    throw new RangeError(`invalid digest length`);
  }
  const bytes = allocUnsafe(4 + 32);
  bytes[0] = CID_VERSION;
  bytes[1] = codec;
  bytes[2] = HASH_SHA256;
  bytes[3] = 32;
  bytes.set(digest, 4);
  return {
    version: CID_VERSION,
    codec,
    digest: {
      codec: HASH_SHA256,
      contents: bytes.subarray(4, 36)
    },
    bytes
  };
};
var create = async (codec, data) => {
  const digest = await toSha256(data);
  return fromDigest(codec, digest);
};
var decodeFirst = (bytes) => {
  if (bytes.length < 36) {
    throw new RangeError(`cid too short`);
  }
  const version = bytes[0];
  const codec = bytes[1];
  const digestType = bytes[2];
  const digestSize = bytes[3];
  if (version !== CID_VERSION) {
    throw new RangeError(`incorrect cid version (got v${version})`);
  }
  if (codec !== CODEC_DCBOR && codec !== CODEC_RAW) {
    throw new RangeError(`incorrect cid codec (got 0x${codec.toString(16)})`);
  }
  if (digestType !== HASH_SHA256) {
    throw new RangeError(`incorrect cid digest codec (got 0x${digestType.toString(16)})`);
  }
  if (digestSize !== 32) {
    throw new RangeError(`incorrect cid digest size (got ${digestSize})`);
  }
  const cid = {
    version: CID_VERSION,
    codec,
    digest: {
      codec: digestType,
      contents: bytes.subarray(4, 36)
    },
    bytes: bytes.subarray(0, 36)
  };
  return [cid, bytes.subarray(36)];
};
var decode = (bytes) => {
  const [cid, remainder] = decodeFirst(bytes);
  if (remainder.length !== 0) {
    throw new RangeError(`cid bytes includes remainder`);
  }
  return cid;
};
var fromString = (input) => {
  if (input.length !== 59 || input[0] !== "b") {
    throw new SyntaxError(`not a valid cid string`);
  }
  const bytes = fromBase32(input.slice(1));
  return decode(bytes);
};
var toString = (cid) => {
  return `b${toBase32(cid.bytes)}`;
};
var fromBinary = (input) => {
  if (input.length !== 37 || input[0] !== 0) {
    throw new SyntaxError(`invalid binary cid`);
  }
  return decode(input.subarray(1));
};

// node_modules/@atcute/cid/dist/cid-link.js
var CID_LINK_SYMBOL = Symbol.for("@atcute/cid-link-wrapper");
var CidLinkWrapper = class {
  /** @internal */
  [CID_LINK_SYMBOL] = true;
  bytes;
  constructor(bytes) {
    this.bytes = bytes;
  }
  get $link() {
    const link = `b${toBase32(this.bytes)}`;
    Object.defineProperty(this, "$link", {
      value: link,
      enumerable: true
    });
    return link;
  }
  toJSON() {
    return { $link: this.$link };
  }
};
var isCidLink = (value) => {
  const val = value;
  return val instanceof CidLinkWrapper || val !== null && typeof val === "object" && typeof val.$link === "string";
};

// node_modules/@atcute/cbor/dist/bytes.js
var BYTES_SYMBOL = Symbol.for("@atcute/bytes-wrapper");
var BytesWrapper = class {
  /** @internal */
  [BYTES_SYMBOL] = true;
  buf;
  constructor(buf) {
    this.buf = buf;
  }
  get $bytes() {
    return toBase64(this.buf);
  }
  toJSON() {
    return { $bytes: this.$bytes };
  }
};
var isBytes = (value) => {
  const val = value;
  return val instanceof BytesWrapper || val !== null && typeof val === "object" && typeof val.$bytes === "string";
};
var toBytes = (buf) => {
  return new BytesWrapper(buf);
};
var fromBytes = (bytes) => {
  if (bytes instanceof BytesWrapper) {
    return bytes.buf;
  }
  return fromBase64(bytes.$bytes);
};

// node_modules/@atcute/cbor/dist/decode.js
var requireBytes = (state, needed) => {
  if (needed > state.b.length - state.p) {
    throw new RangeError(`unexpected end of input`);
  }
};
var readArgument = (state, info) => {
  if (info < 24) {
    return info;
  }
  let arg;
  switch (info) {
    case 24: {
      requireBytes(state, 1);
      arg = readUint8(state);
      if (arg < 24) {
        throw new TypeError(`non-canonical argument encoding`);
      }
      break;
    }
    case 25: {
      requireBytes(state, 2);
      arg = readUint16(state);
      if (arg < 256) {
        throw new TypeError(`non-canonical argument encoding`);
      }
      break;
    }
    case 26: {
      requireBytes(state, 4);
      arg = readUint32(state);
      if (arg < 65536) {
        throw new TypeError(`non-canonical argument encoding`);
      }
      break;
    }
    case 27: {
      requireBytes(state, 8);
      arg = readUint53(state);
      if (arg < 4294967296) {
        throw new TypeError(`non-canonical argument encoding`);
      }
      break;
    }
    default: {
      throw new Error(`invalid argument encoding; got ${info}`);
    }
  }
  return arg;
};
var readFloat64 = (state) => {
  requireBytes(state, 8);
  const view = state.v ??= new DataView(state.b.buffer, state.b.byteOffset, state.b.byteLength);
  const value = view.getFloat64(state.p);
  if (!Number.isFinite(value)) {
    throw new RangeError(`NaN and Infinity values not supported`);
  }
  state.p += 8;
  return value;
};
var readUint8 = (state) => {
  return state.b[state.p++];
};
var readUint16 = (state) => {
  let pos = state.p;
  const buf = state.b;
  const value = buf[pos++] << 8 | buf[pos++];
  state.p = pos;
  return value;
};
var readUint32 = (state) => {
  let pos = state.p;
  const buf = state.b;
  const value = (buf[pos++] << 24 | buf[pos++] << 16 | buf[pos++] << 8 | buf[pos++]) >>> 0;
  state.p = pos;
  return value;
};
var readUint53 = (state) => {
  const hi = readUint32(state);
  const lo = readUint32(state);
  if (hi > 2097151) {
    throw new RangeError(`can't decode integers beyond safe integer range`);
  }
  return hi * 2 ** 32 + lo;
};
var readString = (state, length) => {
  requireBytes(state, length);
  const string2 = decodeUtf8From(state.b, state.p, length);
  state.p += length;
  return string2;
};
var readBytes = (state, length) => {
  requireBytes(state, length);
  const slice = state.b.subarray(state.p, state.p += length);
  return toBytes(slice);
};
var readCid = (state, length) => {
  requireBytes(state, length);
  const cid = fromBinary(state.b.subarray(state.p, state.p += length));
  return new CidLinkWrapper(cid.bytes);
};
var decodeStringKey = (state) => {
  requireBytes(state, 1);
  const prelude = readUint8(state);
  const type = prelude >> 5;
  if (type !== 3) {
    throw new TypeError(`expected map to only have string keys; got type ${type}`);
  }
  const info = prelude & 31;
  const length = info < 24 ? info : readArgument(state, info);
  state.ks = state.p;
  state.kl = length;
  return readString(state, length);
};
var decodeFirst2 = (buf) => {
  const len = buf.length;
  const state = {
    b: buf,
    v: null,
    p: 0,
    ks: 0,
    kl: 0
  };
  let stack = null;
  let value;
  jump: while (state.p < len) {
    const prelude = readUint8(state);
    const type = prelude >> 5;
    const info = prelude & 31;
    const arg = type === 7 ? 0 : info < 24 ? info : readArgument(state, info);
    switch (type) {
      case 0: {
        value = arg;
        break;
      }
      case 1: {
        value = -1 - arg;
        if (value < Number.MIN_SAFE_INTEGER) {
          throw new RangeError(`can't decode integers beyond safe integer range`);
        }
        break;
      }
      case 2: {
        value = readBytes(state, arg);
        break;
      }
      case 3: {
        value = readString(state, arg);
        break;
      }
      case 4: {
        if (arg > 0) {
          requireBytes(state, arg);
          stack = { t: 1, c: value = new Array(arg), k: null, r: arg, n: stack };
          continue jump;
        }
        value = [];
        break;
      }
      case 5: {
        value = {};
        if (arg > 0) {
          const first = decodeStringKey(state);
          stack = { t: 0, c: value, k: first, ks: state.ks, kl: state.kl, r: arg, n: stack };
          continue jump;
        }
        break;
      }
      case 6: {
        switch (arg) {
          case 42: {
            requireBytes(state, 1);
            const prelude2 = readUint8(state);
            const type2 = prelude2 >> 5;
            const info2 = prelude2 & 31;
            if (type2 !== 2) {
              throw new TypeError(`expected cid-link to be type 2 (bytes); got type ${type2}`);
            }
            const len2 = readArgument(state, info2);
            value = readCid(state, len2);
            break;
          }
          default: {
            throw new TypeError(`unsupported tag; got ${arg}`);
          }
        }
        break;
      }
      case 7: {
        switch (info) {
          case 20:
          case 21: {
            value = info === 21;
            break;
          }
          case 22: {
            value = null;
            break;
          }
          case 27: {
            value = readFloat64(state);
            break;
          }
          default: {
            throw new Error(`invalid simple value; got ${info}`);
          }
        }
        break;
      }
      default: {
        throw new TypeError(`invalid type; got ${type}`);
      }
    }
    while (stack !== null) {
      switch (stack.t) {
        case 0: {
          const obj = stack.c;
          const key = stack.k;
          if (key === "__proto__") {
            Object.defineProperty(obj, key, { enumerable: true, configurable: true, writable: true });
          }
          obj[key] = value;
          break;
        }
        case 1: {
          const arr = stack.c;
          const index = arr.length - stack.r;
          arr[index] = value;
          break;
        }
      }
      if (--stack.r) {
        if (!stack.t) {
          const prevStart = stack.ks;
          const prevLength = stack.kl;
          stack.k = decodeStringKey(state);
          const curStart = state.ks;
          const curLength = state.kl;
          let cmp = curLength - prevLength;
          if (cmp === 0) {
            const buf2 = state.b;
            for (let i = 0; i < curLength; i++) {
              cmp = buf2[curStart + i] - buf2[prevStart + i];
              if (cmp !== 0) {
                break;
              }
            }
          }
          if (cmp <= 0) {
            throw new TypeError(`map keys are not in canonical order or contain duplicates`);
          }
          stack.ks = curStart;
          stack.kl = curLength;
        }
        continue jump;
      }
      value = stack.c;
      stack = stack.n;
    }
    return [value, buf.subarray(state.p)];
  }
  throw new RangeError(`unexpected end of input`);
};
var decode2 = (buf) => {
  const [value, remainder] = decodeFirst2(buf);
  if (remainder.length !== 0) {
    throw new Error(`decoded value contains remainder`);
  }
  return value;
};

// node_modules/@atcute/cbor/dist/runtime.node.js
var IS_NODE_RUNTIME = true;

// node_modules/@atcute/cbor/dist/encode.js
var MAX_TYPE_ARG_LEN = 9;
var CHUNK_SIZE = 1024;
var _max = Math.max;
var _isInteger = Number.isInteger;
var _isFinite = Number.isFinite;
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;
var MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER;
var resizeIfNeeded = (state, needed) => {
  const buf = state.b;
  const pos = state.p;
  if (buf.byteLength < pos + needed) {
    state.c.push(buf.subarray(0, pos));
    state.l += pos;
    state.b = allocUnsafe(_max(CHUNK_SIZE, needed));
    state.v = null;
    state.p = 0;
  }
};
var getTypeInfoLength = (arg) => {
  return arg < 24 ? 1 : arg < 256 ? 2 : arg < 65536 ? 3 : arg < 4294967296 ? 5 : 9;
};
var writeFloat64 = (state, val) => {
  const buf = state.b;
  const view = state.v ??= new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  view.setFloat64(state.p, val);
  state.p += 8;
};
var writeUint8 = (state, val) => {
  state.b[state.p++] = val;
};
var writeUint16 = (state, val) => {
  let pos = state.p;
  const buf = state.b;
  buf[pos++] = val >>> 8;
  buf[pos++] = val & 255;
  state.p = pos;
};
var writeUint32 = (state, val) => {
  let pos = state.p;
  const buf = state.b;
  buf[pos++] = val >>> 24;
  buf[pos++] = val >>> 16 & 255;
  buf[pos++] = val >>> 8 & 255;
  buf[pos++] = val & 255;
  state.p = pos;
};
var writeUint53 = (state, val) => {
  let pos = state.p;
  const buf = state.b;
  const hi = val / 2 ** 32 | 0;
  const lo = val >>> 0;
  buf[pos++] = hi >>> 24;
  buf[pos++] = hi >>> 16 & 255;
  buf[pos++] = hi >>> 8 & 255;
  buf[pos++] = hi & 255;
  buf[pos++] = lo >>> 24;
  buf[pos++] = lo >>> 16 & 255;
  buf[pos++] = lo >>> 8 & 255;
  buf[pos++] = lo & 255;
  state.p = pos;
};
var writeTypeAndArgument = (state, type, arg) => {
  if (arg < 24) {
    writeUint8(state, type << 5 | arg);
  } else if (arg < 256) {
    writeUint8(state, type << 5 | 24);
    writeUint8(state, arg);
  } else if (arg < 65536) {
    writeUint8(state, type << 5 | 25);
    writeUint16(state, arg);
  } else if (arg < 4294967296) {
    writeUint8(state, type << 5 | 26);
    writeUint32(state, arg);
  } else {
    writeUint8(state, type << 5 | 27);
    writeUint53(state, arg);
  }
};
var writeInteger = (state, val) => {
  resizeIfNeeded(state, MAX_TYPE_ARG_LEN);
  if (val < 0) {
    writeTypeAndArgument(state, 1, -val - 1);
  } else {
    writeTypeAndArgument(state, 0, val);
  }
};
var writeFloat = (state, val) => {
  resizeIfNeeded(state, 9);
  writeUint8(state, 224 | 27);
  writeFloat64(state, val);
};
var writeNumber = (state, val) => {
  if (!_isFinite(val)) {
    throw new RangeError(`NaN and Infinity values not supported`);
  }
  if (val > MAX_SAFE_INTEGER || val < MIN_SAFE_INTEGER) {
    throw new RangeError(`can't encode numbers beyond safe integer range`);
  }
  if (_isInteger(val)) {
    writeInteger(state, val);
  } else {
    writeFloat(state, val);
  }
};
var writeString = (state, val) => {
  const strLength = val.length;
  if (strLength === 0) {
    resizeIfNeeded(state, 1);
    writeUint8(state, 96);
    return;
  }
  resizeIfNeeded(state, strLength * 3 + MAX_TYPE_ARG_LEN);
  ascii: if (!IS_NODE_RUNTIME || strLength < 24) {
    const ptr = state.p + getTypeInfoLength(strLength);
    const first = val.charCodeAt(0);
    if (first > 127) {
      break ascii;
    }
    state.b[ptr] = first;
    let i = 1;
    for (; i + 3 < strLength; i += 4) {
      const a = val.charCodeAt(i);
      const b = val.charCodeAt(i + 1);
      const c = val.charCodeAt(i + 2);
      const d = val.charCodeAt(i + 3);
      if ((a | b | c | d) & 128) {
        break ascii;
      }
      state.b[ptr + i] = a;
      state.b[ptr + i + 1] = b;
      state.b[ptr + i + 2] = c;
      state.b[ptr + i + 3] = d;
    }
    for (; i < strLength; i++) {
      const code = val.charCodeAt(i);
      if (code > 127) {
        break ascii;
      }
      state.b[ptr + i] = code;
    }
    writeTypeAndArgument(state, 3, strLength);
    state.p += strLength;
    return;
  }
  const estimatedHeaderSize = getTypeInfoLength(strLength * 2);
  const estimatedPosition = state.p + estimatedHeaderSize;
  const len = encodeUtf8Into(state.b, val, estimatedPosition);
  const headerSize = getTypeInfoLength(len);
  if (estimatedHeaderSize !== headerSize) {
    state.b.copyWithin(state.p + headerSize, estimatedPosition, estimatedPosition + len);
  }
  writeTypeAndArgument(state, 3, len);
  state.p += len;
};
var writeBytes = (state, val) => {
  const buf = fromBytes(val);
  const len = buf.byteLength;
  resizeIfNeeded(state, len + MAX_TYPE_ARG_LEN);
  writeTypeAndArgument(state, 2, len);
  state.b.set(buf, state.p);
  state.p += len;
};
var writeCid = (state, val) => {
  const buf = val instanceof CidLinkWrapper ? val.bytes : fromString(val.$link).bytes;
  const len = buf.byteLength + 1;
  resizeIfNeeded(state, len + 2 * MAX_TYPE_ARG_LEN);
  writeTypeAndArgument(state, 6, 42);
  writeTypeAndArgument(state, 2, len);
  state.b[state.p] = 0;
  state.b.set(buf, state.p + 1);
  state.p += len;
};
var writeValue = (state, val) => {
  switch (typeof val) {
    case "boolean": {
      resizeIfNeeded(state, 1);
      return writeUint8(state, 244 + +val);
    }
    case "number": {
      return writeNumber(state, val);
    }
    case "string": {
      return writeString(state, val);
    }
    case "object": {
      if (val === null) {
        resizeIfNeeded(state, 1);
        return writeUint8(state, 246);
      }
      if (Array.isArray(val)) {
        const len = val.length;
        resizeIfNeeded(state, MAX_TYPE_ARG_LEN);
        writeTypeAndArgument(state, 4, len);
        for (let idx = 0; idx < len; idx++) {
          writeValue(state, val[idx]);
        }
        return;
      }
      if (val.constructor === Object) {
        const keys = getOrderedObjectKeys(val);
        const len = keys.length;
        if (len === 1) {
          const key = keys[0];
          if (key === "$link") {
            if (typeof val.$link === "string") {
              writeCid(state, val);
              return;
            }
            throw new TypeError(`unexpected cid-link value`);
          }
          if (key === "$bytes") {
            if (typeof val.$bytes === "string") {
              writeBytes(state, val);
              return;
            }
            throw new TypeError(`unexpected bytes value`);
          }
        }
        resizeIfNeeded(state, MAX_TYPE_ARG_LEN);
        writeTypeAndArgument(state, 5, len);
        for (let idx = 0; idx < len; idx++) {
          const key = keys[idx];
          writeString(state, key);
          writeValue(state, val[key]);
        }
        return;
      }
      if ("$link" in val) {
        if (val instanceof CidLinkWrapper || typeof val.$link === "string") {
          writeCid(state, val);
          return;
        }
        throw new TypeError(`unexpected cid-link value`);
      }
      if ("$bytes" in val) {
        if (val instanceof BytesWrapper || typeof val.$bytes === "string") {
          writeBytes(state, val);
          return;
        }
        throw new TypeError(`unexpected bytes value`);
      }
    }
  }
  throw new TypeError(`unsupported type: ${val}`);
};
var createState = () => {
  return {
    c: [],
    b: allocUnsafe(CHUNK_SIZE),
    v: null,
    p: 0,
    l: 0
  };
};
var encode = (value) => {
  const state = createState();
  writeValue(state, value);
  const final = state.b.subarray(0, state.p);
  if (!state.c.length) {
    return final;
  }
  state.c.push(final);
  return concat(state.c, state.l + state.p);
};
var sortUtf8Keys = (keys) => {
  const len = keys.length;
  const lengths = new Array(len);
  const bytes = new Array(len);
  for (let i = 0; i < len; i++) {
    lengths[i] = getUtf8Length(keys[i]);
  }
  for (let i = 1; i < len; i++) {
    const keyA = keys[i];
    const lenA = lengths[i];
    let bytesA = bytes[i];
    let j = i - 1;
    for (; j >= 0; j--) {
      let cmp = lenA - lengths[j];
      if (cmp === 0) {
        cmp = compare(bytesA ??= encodeUtf8(keyA), bytes[j] ??= encodeUtf8(keys[j]));
      }
      if (cmp > 0) {
        break;
      }
      keys[j + 1] = keys[j];
      lengths[j + 1] = lengths[j];
      bytes[j + 1] = bytes[j];
    }
    keys[j + 1] = keyA;
    lengths[j + 1] = lenA;
    bytes[j + 1] = bytesA;
  }
};
var getOrderedObjectKeys = (obj) => {
  const keys = Object.keys(obj);
  let len = 0;
  let ascii = true;
  for (let i = 0; i < keys.length; i++) {
    const valA = keys[i];
    if (obj[valA] === void 0) {
      continue;
    }
    if (ascii) {
      for (let k = 0; k < valA.length; k++) {
        if (valA.charCodeAt(k) > 127) {
          ascii = false;
          break;
        }
      }
    }
    const lenA = valA.length;
    let j = len - 1;
    for (; j >= 0; j--) {
      const valB = keys[j];
      if (lenA > valB.length || lenA === valB.length && valA > valB) {
        break;
      }
      keys[j + 1] = valB;
    }
    keys[j + 1] = valA;
    len++;
  }
  keys.length = len;
  if (!ascii) {
    sortUtf8Keys(keys);
  }
  return keys;
};

// node_modules/@atcute/repo/dist/types.js
var isCommit = (value) => {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const obj = value;
  return obj.version === 3 && typeof obj.did === "string" && isCidLink(obj.data) && typeof obj.rev === "string" && (obj.prev === null || isCidLink(obj.prev)) && isBytes(obj.sig);
};

// node_modules/@atcute/varint/dist/index.js
var MSB = 128;
var REST = 127;
var MSBALL = ~REST;
var INT = 2 ** 31;
var N1 = 2 ** 7;
var N2 = 2 ** 14;
var N3 = 2 ** 21;
var N4 = 2 ** 28;
var N5 = 2 ** 35;
var N6 = 2 ** 42;
var N7 = 2 ** 49;
var N8 = 2 ** 56;
var N9 = 2 ** 63;
var MAX_SAFE_INTEGER2 = Number.MAX_SAFE_INTEGER;
var _min = Math.min;
var decode3 = (buf, offset = 0, length = buf.length) => {
  const end = _min(offset + length, buf.length);
  let counter = offset;
  if (counter >= end) {
    throw new RangeError("could not decode varint");
  }
  let b = buf[counter++];
  let res = b & REST;
  if (b < MSB) {
    return { value: res, nextOffset: counter };
  }
  if (counter >= end) {
    throw new RangeError("could not decode varint");
  }
  b = buf[counter++];
  res |= (b & REST) << 7;
  if (b < MSB) {
    return { value: res, nextOffset: counter };
  }
  if (counter >= end) {
    throw new RangeError("could not decode varint");
  }
  b = buf[counter++];
  res |= (b & REST) << 14;
  if (b < MSB) {
    return { value: res, nextOffset: counter };
  }
  if (counter >= end) {
    throw new RangeError("could not decode varint");
  }
  b = buf[counter++];
  res |= (b & REST) << 21;
  if (b < MSB) {
    return { value: res, nextOffset: counter };
  }
  if (counter >= end) {
    throw new RangeError("could not decode varint");
  }
  b = buf[counter++];
  res += (b & REST) * N4;
  if (b < MSB) {
    return { value: res, nextOffset: counter };
  }
  let shift = 35;
  do {
    if (counter >= end) {
      throw new RangeError("could not decode varint");
    }
    b = buf[counter++];
    res += (b & REST) * 2 ** shift;
    shift += 7;
  } while (b >= MSB);
  return { value: res, nextOffset: counter };
};

// node_modules/@atcute/car/dist/types.js
var isCarV1Header = (value) => {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const { version, roots } = value;
  return version === 1 && Array.isArray(roots) && roots.every((root) => root instanceof CidLinkWrapper);
};

// node_modules/@atcute/car/dist/reader.js
var fromUint8Array = (buffer) => {
  const { header, nextOffset: headerOffset } = readHeader(buffer, 0);
  let pos = headerOffset;
  return {
    header,
    roots: header.data.roots,
    iterate() {
      return {
        next() {
          if (pos >= buffer.length) {
            return {
              done: true,
              value: void 0
            };
          }
          const entryStart = pos;
          const { value: entryLength, nextOffset: lengthOffset } = decode3(buffer, pos, 8);
          pos = lengthOffset;
          const cidStart = pos;
          const { cid, nextOffset: cidOffset } = readCid2(buffer, pos);
          pos = cidOffset;
          const bytesStart = pos;
          const bytesSize = entryLength - (bytesStart - cidStart);
          if (bytesSize < 0 || bytesStart + bytesSize > buffer.length) {
            throw new RangeError("unexpected end of data");
          }
          const bytesEnd = bytesStart + bytesSize;
          const bytes = buffer.subarray(bytesStart, bytesEnd);
          pos = bytesEnd;
          const cidEnd = bytesStart;
          const entryEnd = bytesEnd;
          return {
            done: false,
            value: {
              cid,
              bytes,
              entryStart,
              entryEnd,
              cidStart,
              cidEnd,
              bytesStart,
              bytesEnd
            }
          };
        },
        [Symbol.iterator]() {
          return this;
        }
      };
    },
    [Symbol.iterator]() {
      return this.iterate();
    }
  };
};
var readHeader = (source, offset) => {
  const headerStart = offset;
  const { value: length, nextOffset: lengthOffset } = decode3(source, offset, 8);
  if (length === 0) {
    throw new RangeError(`invalid car header; length=0`);
  }
  const dataStart = lengthOffset;
  const dataEnd = dataStart + length;
  if (dataEnd > source.length) {
    throw new RangeError("unexpected end of data");
  }
  const data = decode2(source.subarray(dataStart, dataEnd));
  if (!isCarV1Header(data)) {
    throw new TypeError(`expected a car v1 archive`);
  }
  const headerEnd = dataEnd;
  return {
    header: { data, headerStart, headerEnd, dataStart, dataEnd },
    nextOffset: dataEnd
  };
};
var readCid2 = (source, offset) => {
  const cidEnd = offset + 36;
  if (cidEnd > source.length) {
    throw new RangeError("unexpected end of data");
  }
  const bytes = source.subarray(offset, cidEnd);
  const version = bytes[0];
  const codec = bytes[1];
  const digestType = bytes[2];
  const digestSize = bytes[3];
  if (version !== CID_VERSION) {
    throw new RangeError(`incorrect cid version (got v${version})`);
  }
  if (codec !== CODEC_DCBOR && codec !== CODEC_RAW) {
    throw new RangeError(`incorrect cid codec (got 0x${codec.toString(16)})`);
  }
  if (digestType !== HASH_SHA256) {
    throw new RangeError(`incorrect cid digest type (got 0x${digestType.toString(16)})`);
  }
  if (digestSize !== 32) {
    throw new RangeError(`incorrect cid digest size (got ${digestSize})`);
  }
  return {
    cid: {
      version,
      codec,
      digest: {
        codec: digestType,
        contents: bytes.subarray(4, 36)
      },
      bytes
    },
    nextOffset: cidEnd
  };
};

// node_modules/@atcute/mst/dist/types.js
var isTreeEntry = (value) => {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const obj = value;
  return typeof obj.p === "number" && isBytes(obj.k) && isCidLink(obj.v) && (obj.t === null || isCidLink(obj.t));
};
var isNodeData = (value) => {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const obj = value;
  return (obj.l === null || isCidLink(obj.l)) && Array.isArray(obj.e) && obj.e.every(isTreeEntry);
};

// node_modules/@atcute/repo/dist/verify.js
var verifyRecord = async ({ did, collection, rkey, publicKey, carBytes }) => {
  let blockmap;
  let commit;
  {
    const reader = fromUint8Array(carBytes);
    if (reader.header.data.roots.length !== 1) {
      throw new Error(`car must have exactly one root`);
    }
    blockmap = /* @__PURE__ */ new Map();
    for (const entry of reader) {
      const cidString = toString(entry.cid);
      const expectedCid = toString(await create(entry.cid.codec, entry.bytes));
      if (cidString !== expectedCid) {
        throw new Error(`cid does not match bytes`);
      }
      blockmap.set(cidString, entry.bytes);
    }
    if (blockmap.size === 0) {
      throw new Error(`car must have at least one block`);
    }
    commit = readBlock(blockmap, reader.header.data.roots[0].$link, isCommit);
  }
  if (did !== void 0 && commit.did !== did) {
    throw new Error(`did in commit does not match expected did`);
  }
  if (publicKey) {
    const { sig, ...unsigned } = commit;
    const data = encode(unsigned);
    const valid = await publicKey.verify(fromBytes(sig), data);
    if (!valid) {
      throw new Error(`signature verification failed`);
    }
  }
  const targetKey = `${collection}/${rkey}`;
  const { found } = await dfs(blockmap, commit.data.$link, targetKey);
  if (!found) {
    throw new Error(`could not find record in car`);
  }
  return {
    cid: found.cid,
    record: found.record
  };
};
var readBlock = (blockmap, cid, validate) => {
  const bytes = blockmap.get(cid);
  if (!bytes) {
    throw new Error(`cid not found in blockmap; cid=${cid}`);
  }
  const decoded = decode2(bytes);
  if (!validate(decoded)) {
    throw new Error(`validation failed for cid=${cid}`);
  }
  return decoded;
};
var dfs = async (blockmap, from, targetKey, visited = /* @__PURE__ */ new Set()) => {
  if (from == null) {
    return { found: false };
  }
  {
    if (visited.has(from)) {
      throw new Error(`cycle detected; cid=${from}`);
    }
    visited.add(from);
  }
  let node;
  {
    const bytes = blockmap.get(from);
    if (!bytes) {
      return { found: false };
    }
    const decoded = decode2(bytes);
    if (!isNodeData(decoded)) {
      throw new Error(`invalid mst node; cid=${from}`);
    }
    node = decoded;
  }
  const left = await dfs(blockmap, node.l?.$link, targetKey, visited);
  let key = "";
  let found = left.found;
  let depth;
  let firstKey;
  let lastKey;
  for (const entry of node.e) {
    key = key.substring(0, entry.p) + decodeUtf8From(fromBytes(entry.k));
    if (key === targetKey) {
      const recordBytes = blockmap.get(entry.v.$link);
      if (recordBytes) {
        const record2 = decode2(recordBytes);
        found = { cid: entry.v.$link, record: record2 };
      }
    }
    const keyDigest = await toSha256(encodeUtf8(key));
    let zeroCount = 0;
    outerLoop: for (const byte of keyDigest) {
      for (let bit = 7; bit >= 0; bit--) {
        if ((byte >> bit & 1) !== 0) {
          break outerLoop;
        }
        zeroCount++;
      }
    }
    const thisDepth = Math.floor(zeroCount / 2);
    if (depth === void 0) {
      depth = thisDepth;
    } else if (depth !== thisDepth) {
      throw new Error(`node has entries with different depths; cid=${from}`);
    }
    if (lastKey === void 0) {
      firstKey = key;
      lastKey = key;
    }
    if (lastKey > key) {
      throw new Error(`entries are out of order; cid=${from}`);
    }
    const right = await dfs(blockmap, entry.t?.$link, targetKey, visited);
    if (right.min && right.min < lastKey) {
      throw new Error(`entries are out of order; cid=${from}`);
    }
    found = found || right.found;
    if (left.depth !== void 0 && left.depth >= thisDepth) {
      throw new Error(`depths are out of order; cid=${from}`);
    }
    if (right.depth !== void 0 && right.depth >= thisDepth) {
      throw new Error(`depths are out of order; cid=${from}`);
    }
    lastKey = right.max ?? key;
  }
  if (left.max && firstKey && left.max > firstKey) {
    throw new Error(`entries are out of order; cid=${from}`);
  }
  return {
    found,
    min: firstKey,
    max: lastKey,
    depth
  };
};

// node_modules/@atcute/lexicon-resolver/dist/constants.js
var LEXICON_SCHEMA_COLLECTION = "com.atproto.lexicon.schema";

// node_modules/@atcute/lexicon-resolver/dist/schemas/xrpc.js
var LexiconSchemaResolver = class {
  didDocumentResolver;
  #fetch;
  constructor({ didDocumentResolver: didDocumentResolver2, fetch: fetchThis = fetch }) {
    this.didDocumentResolver = didDocumentResolver2;
    this.#fetch = fetchThis;
  }
  async resolve(authority, nsid2, options) {
    const didDocument2 = await this.didDocumentResolver.resolve(authority, {
      signal: options?.signal,
      noCache: options?.noCache
    });
    const pdsEndpoint = getPdsEndpoint(didDocument2);
    if (!pdsEndpoint) {
      throw new FailedLexiconResolutionError(nsid2, {
        cause: new TypeError(`no pds service in did document; did=${authority}`)
      });
    }
    let carBytes;
    try {
      const url = new URL("/xrpc/com.atproto.sync.getRecord", pdsEndpoint);
      url.searchParams.set("did", authority);
      url.searchParams.set("collection", LEXICON_SCHEMA_COLLECTION);
      url.searchParams.set("rkey", nsid2);
      const response = await (0, this.#fetch)(url, {
        signal: options?.signal,
        cache: options?.noCache ? "no-cache" : void 0,
        headers: { accept: "application/vnd.ipld.car" }
      });
      if (!response.ok) {
        throw new FailedResponseError(response);
      }
      carBytes = await response.bytes();
    } catch (cause) {
      throw new FailedLexiconResolutionError(nsid2, { cause });
    }
    let verifiedRecord;
    try {
      const controller = getAtprotoVerificationMaterial(didDocument2);
      if (!controller) {
        throw new Error(`did document does not contain verification material`);
      }
      const found = getPublicKeyFromDidController(controller);
      let publicKey;
      switch (found.type) {
        case "p256": {
          publicKey = await P256PublicKey.importRaw(found.publicKeyBytes);
          break;
        }
        case "secp256k1": {
          publicKey = await NodeSecp256k1PublicKey.importRaw(found.publicKeyBytes);
          break;
        }
      }
      verifiedRecord = await verifyRecord({
        did: authority,
        collection: LEXICON_SCHEMA_COLLECTION,
        rkey: nsid2,
        publicKey,
        carBytes
      });
    } catch (cause) {
      throw new InvalidLexiconProofError(nsid2, { cause });
    }
    const rawSchema = verifiedRecord.record;
    if (typeof rawSchema !== "object" || rawSchema === null || rawSchema.$type !== LEXICON_SCHEMA_COLLECTION || rawSchema.id !== nsid2) {
      throw new InvalidLexiconSchemaError(nsid2);
    }
    let schema;
    try {
      schema = lexiconDoc.parse(rawSchema, { mode: "passthrough" });
    } catch (cause) {
      throw new InvalidLexiconSchemaError(nsid2, { cause });
    }
    return {
      uri: `at://${authority}/${LEXICON_SCHEMA_COLLECTION}/${nsid2}`,
      cid: verifiedRecord.cid,
      rawSchema: verifiedRecord.record,
      schema
    };
  }
};

// node_modules/@atcute/lexicon-resolver-node/dist/authority/node-dns.js
var import_promises = __toESM(require("node:dns/promises"), 1);
var SUBDOMAIN = "_lexicon";
var PREFIX = "did=";
var NodeDnsLexiconAuthorityResolver = class {
  #resolver = null;
  get nameservers() {
    return this.#resolver?.getServers();
  }
  constructor({ nameservers } = {}) {
    if (nameservers) {
      this.#resolver = new import_promises.default.Resolver();
      this.#resolver.setServers(nameservers);
    }
  }
  async resolve(nsid2, options) {
    const lookupDomain = nsidToLookupDomain(nsid2);
    let results;
    try {
      const signal = options?.signal;
      const resolver = this.#resolver ?? import_promises.default;
      results = await resolver.resolveTxt(`${SUBDOMAIN}.${lookupDomain}`);
      signal?.throwIfAborted();
    } catch (cause) {
      if (cause instanceof Error && "code" in cause && cause.code === "ENOTFOUND") {
        throw new AuthorityNotFoundError(nsid2);
      }
      throw new FailedAuthorityResolutionError(nsid2, { cause });
    }
    const records = results.map((record2) => record2.join("").replace(/^"|"$/g, "").replace(/\\"/g, '"'));
    for (let i = 0, il = records.length; i < il; i++) {
      const data = records[i];
      if (!data.startsWith(PREFIX)) {
        continue;
      }
      for (let j = i + 1; j < il; j++) {
        const data2 = records[j];
        if (data2.startsWith(PREFIX)) {
          throw new AmbiguousAuthorityError(nsid2);
        }
      }
      const did = data.slice(PREFIX.length);
      if (!isAtprotoDid(did)) {
        throw new InvalidResolvedAuthorityError(nsid2, did);
      }
      return did;
    }
    throw new AuthorityNotFoundError(nsid2);
  }
};

// node_modules/@atcute/identity-resolver/dist/errors.js
var DidDocumentResolutionError = class extends Error {
  name = "DidResolutionError";
};
var UnsupportedDidMethodError = class extends DidDocumentResolutionError {
  name = "UnsupportedDidMethodError";
  did;
  constructor(did) {
    super(`unsupported did method; did=${did}`);
    this.did = did;
  }
};
var ImproperDidError = class extends DidDocumentResolutionError {
  name = "ImproperDidError";
  did;
  constructor(did) {
    super(`improper did; did=${did}`);
    this.did = did;
  }
};
var DocumentNotFoundError = class extends DidDocumentResolutionError {
  name = "DocumentNotFoundError";
  did;
  constructor(did) {
    super(`did document not found; did=${did}`);
    this.did = did;
  }
};
var FailedDocumentResolutionError = class extends DidDocumentResolutionError {
  name = "FailedDocumentResolutionError";
  did;
  constructor(did, options) {
    super(`failed to resolve did document; did=${did}`, options);
    this.did = did;
  }
};
var HandleResolutionError = class extends Error {
  name = "HandleResolutionError";
};
var DidNotFoundError = class extends HandleResolutionError {
  name = "DidNotFoundError";
  handle;
  constructor(handle) {
    super(`handle returned no did; handle=${handle}`);
    this.handle = handle;
  }
};
var FailedHandleResolutionError = class extends HandleResolutionError {
  name = "FailedHandleResolutionError";
  handle;
  constructor(handle, options) {
    super(`failed to resolve handle; handle=${handle}`, options);
    this.handle = handle;
  }
};
var InvalidResolvedHandleError = class extends HandleResolutionError {
  name = "InvalidResolvedHandleError";
  handle;
  did;
  constructor(handle, did) {
    super(`handle returned invalid did; handle=${handle}; did=${did}`);
    this.handle = handle;
    this.did = did;
  }
};
var AmbiguousHandleError = class extends HandleResolutionError {
  name = "AmbiguousHandleError";
  constructor(handle) {
    super(`handle returned multiple did values; handle=${handle}`);
  }
};

// node_modules/@atcute/identity-resolver/dist/did/composite.js
var CompositeDidDocumentResolver = class {
  #methods;
  constructor({ methods }) {
    this.#methods = new Map(Object.entries(methods));
  }
  async resolve(did, options) {
    const method = extractDidMethod(did);
    const resolver = this.#methods.get(method);
    if (resolver === void 0) {
      throw new UnsupportedDidMethodError(did);
    }
    return await resolver.resolve(did, options);
  }
};

// node_modules/@atcute/identity-resolver/dist/did/utils.js
var fetchDocHandler = pipe(isResponseOk, parseResponseAsJson(/^application\/(did\+ld\+)?json$/, 20 * 1024), validateJsonWith(typedefs_exports.didDocument, { mode: "passthrough" }));

// node_modules/@atcute/identity-resolver/dist/did/methods/plc.js
var PlcDidDocumentResolver = class {
  apiUrl;
  #fetch;
  constructor({ apiUrl = "https://plc.directory", fetch: fetchThis = fetch } = {}) {
    this.apiUrl = apiUrl;
    this.#fetch = fetchThis;
  }
  async resolve(did, options) {
    if (!did.startsWith("did:plc:")) {
      throw new UnsupportedDidMethodError(did);
    }
    let json;
    try {
      const url = new URL(`/${encodeURIComponent(did)}`, this.apiUrl);
      const response = await (0, this.#fetch)(url, {
        signal: options?.signal,
        cache: options?.noCache ? "no-cache" : void 0,
        redirect: "manual",
        headers: { accept: "application/did+ld+json,application/json" }
      });
      if (response.status >= 300 && response.status < 400) {
        throw new TypeError(`unexpected redirect`);
      }
      const handled = await fetchDocHandler(response);
      json = handled.json;
    } catch (cause) {
      if (cause instanceof FailedResponseError && cause.status === 404) {
        throw new DocumentNotFoundError(did);
      }
      throw new FailedDocumentResolutionError(did, { cause });
    }
    return json;
  }
};

// node_modules/@atcute/identity-resolver/dist/did/methods/web.js
var AtprotoWebDidDocumentResolver = class {
  #fetch;
  constructor({ fetch: fetchThis = fetch } = {}) {
    this.#fetch = fetchThis;
  }
  async resolve(did, options) {
    if (!did.startsWith("did:web:")) {
      throw new UnsupportedDidMethodError(did);
    }
    const [host, ...paths] = did.slice(8).split(":").map(decodeURIComponent);
    const url = new URL(`https://${host}/.well-known/did.json`);
    if (paths.length > 0) {
      throw new ImproperDidError(did);
    }
    let json;
    try {
      const response = await (0, this.#fetch)(url, {
        signal: options?.signal,
        cache: options?.noCache ? "no-cache" : void 0,
        redirect: "manual",
        headers: { accept: "application/did+ld+json,application/json" }
      });
      if (response.status >= 300 && response.status < 400) {
        throw new TypeError(`unexpected redirect`);
      }
      const handled = await fetchDocHandler(response);
      json = handled.json;
    } catch (cause) {
      if (cause instanceof FailedResponseError && cause.status === 404) {
        throw new DocumentNotFoundError(did);
      }
      throw new FailedDocumentResolutionError(did, { cause });
    }
    return json;
  }
};

// node_modules/@atcute/identity-resolver/dist/handle/methods/well-known.js
var fetchWellKnownHandler = pipe(isResponseOk, readResponseAsText(2048 + 16));
var WellKnownHandleResolver = class {
  #fetch;
  constructor({ fetch: fetchThis = fetch } = {}) {
    this.#fetch = fetchThis;
  }
  async resolve(handle, options) {
    let text;
    try {
      const url = new URL("/.well-known/atproto-did", `https://${handle}`);
      const response = await (0, this.#fetch)(url, {
        signal: options?.signal,
        cache: options?.noCache ? "no-cache" : void 0,
        redirect: "manual"
      });
      if (response.status >= 300 && response.status < 400) {
        throw new TypeError(`unexpected redirect`);
      }
      const handled = await fetchWellKnownHandler(response);
      text = handled.text;
    } catch (cause) {
      if (cause instanceof FailedResponseError && cause.status === 404) {
        throw new DidNotFoundError(handle);
      }
      throw new FailedHandleResolutionError(handle, { cause });
    }
    const did = text.split("\n")[0].trim();
    if (!isAtprotoDid(did)) {
      throw new InvalidResolvedHandleError(handle, did);
    }
    return did;
  }
};

// node_modules/@atcute/identity-resolver-node/dist/did/methods/node.js
var import_promises2 = __toESM(require("node:dns/promises"), 1);
var SUBDOMAIN2 = "_atproto";
var PREFIX2 = "did=";
var NodeDnsHandleResolver = class {
  #resolver = null;
  get nameservers() {
    return this.#resolver?.getServers();
  }
  constructor({ nameservers } = {}) {
    if (nameservers) {
      this.#resolver = new import_promises2.default.Resolver();
      this.#resolver.setServers(nameservers);
    }
  }
  async resolve(handle, options) {
    let results;
    try {
      const signal = options?.signal;
      const resolver = this.#resolver ?? import_promises2.default;
      results = await resolver.resolveTxt(`${SUBDOMAIN2}.${handle}`);
      signal?.throwIfAborted();
    } catch (cause) {
      if (cause instanceof Error && "code" in cause && cause.code === "ENOTFOUND") {
        throw new DidNotFoundError(handle);
      }
      throw new FailedHandleResolutionError(handle, { cause });
    }
    const records = results.map((record2) => record2.join("").replace(/^"|"$/g, "").replace(/\\"/g, '"'));
    for (let i = 0, il = records.length; i < il; i++) {
      const data = records[i];
      if (!data.startsWith(PREFIX2)) {
        continue;
      }
      for (let j = i + 1; j < il; j++) {
        const data2 = records[j];
        if (data2.startsWith(PREFIX2)) {
          throw new AmbiguousHandleError(handle);
        }
      }
      const did = data.slice(PREFIX2.length);
      if (!isAtprotoDid(did)) {
        throw new InvalidResolvedHandleError(handle, did);
      }
      return did;
    }
    throw new DidNotFoundError(handle);
  }
};

// src/lib/resolvers.ts
var didDocumentResolver = new CompositeDidDocumentResolver({
  methods: {
    plc: new PlcDidDocumentResolver(),
    web: new AtprotoWebDidDocumentResolver()
  }
});
var dnsResolver = new NodeDnsHandleResolver();
var httpResolver = new WellKnownHandleResolver();

// src/lib/render.ts
function formatType(prop) {
  if (prop.ref) return `\`${prop.ref}\``;
  if (prop.refs) return "union";
  if (prop.format) return `\`${prop.type}:${prop.format}\``;
  return `\`${prop.type}\``;
}
function formatUnionRefs(refs) {
  return refs.map((r) => `- \`${r}\``).join("\n") + "\n";
}
function formatConstraints(prop) {
  const constraints = [];
  if (prop.minLength !== void 0) constraints.push(`minLength: ${prop.minLength}`);
  if (prop.maxLength !== void 0) constraints.push(`maxLength: ${prop.maxLength}`);
  if (prop.maxGraphemes !== void 0) constraints.push(`maxGraphemes: ${prop.maxGraphemes}`);
  if (prop.minGraphemes !== void 0) constraints.push(`minGraphemes: ${prop.minGraphemes}`);
  if (prop.minimum !== void 0) constraints.push(`min: ${prop.minimum}`);
  if (prop.maximum !== void 0) constraints.push(`max: ${prop.maximum}`);
  if (prop.maxSize !== void 0) constraints.push(`maxSize: ${prop.maxSize}`);
  if (prop.accept) constraints.push(`accept: [${prop.accept.join(", ")}]`);
  if (prop.enum) constraints.push(`enum: [${prop.enum.join(", ")}]`);
  if (prop.const !== void 0) constraints.push(`const: ${prop.const}`);
  if (prop.default !== void 0) constraints.push(`default: ${JSON.stringify(prop.default)}`);
  if (prop.knownValues) constraints.push(`knownValues: [${prop.knownValues.join(", ")}]`);
  if (prop.closed) constraints.push(`closed: true`);
  return constraints.length > 0 ? ` (${constraints.join(", ")})` : "";
}
function renderProperties(properties, required = []) {
  let md = "";
  for (const [name, prop] of Object.entries(properties)) {
    const isRequired = required.includes(name);
    md += `**${name}** ${formatType(prop)}${formatConstraints(prop)}${isRequired ? " *required*" : ""}
`;
    if (prop.refs) {
      md += formatUnionRefs(prop.refs);
    }
    if (prop.items) {
      md += `
items: ${formatType(prop.items)}${formatConstraints(prop.items)}
`;
      if (prop.items.refs) {
        md += formatUnionRefs(prop.items.refs);
      }
    }
    if (prop.description) md += `> ${prop.description}
`;
    md += "\n";
  }
  return md;
}
function renderPermission(permission, index) {
  let md = `- **#${index + 1}** \`${permission.resource}\`
`;
  if (permission.collection && permission.collection.length > 0) {
    md += `  - Collections:
`;
    for (const col of permission.collection) {
      md += `    - \`${col}\`
`;
    }
  }
  if (permission.action && permission.action.length > 0) {
    md += `  - Actions: ${permission.action.join(", ")}
`;
  }
  if (permission.lxm && permission.lxm.length > 0) {
    md += `  - Lexicon Methods:
`;
    for (const method of permission.lxm) {
      md += `    - \`${method}\`
`;
    }
  }
  if (permission.aud) {
    md += `  - Audience: \`${permission.aud}\`
`;
  }
  if (permission.inheritAud) {
    md += `  - Inherit Audience: true
`;
  }
  return md;
}
function renderDef(name, def) {
  let md = `## ${name === "main" ? "Main Definition" : name} \`${def.type}\`

`;
  if (def.description) md += `${def.description}

`;
  if (def.key) md += `**Record Key:** \`${def.key}\`

`;
  if (def.type === "permission-set") {
    if (def.title) md += `**Title:** ${def.title}

`;
    if (def["title:langs"]) {
      md += `**Localized Titles:**
`;
      for (const [lang, text] of Object.entries(def["title:langs"])) {
        md += `- \`${lang}\`: ${text}
`;
      }
      md += "\n";
    }
    if (def.detail) md += `**Detail:** ${def.detail}

`;
    if (def["detail:langs"]) {
      md += `**Localized Details:**
`;
      for (const [lang, text] of Object.entries(def["detail:langs"])) {
        md += `- \`${lang}\`: ${text}
`;
      }
      md += "\n";
    }
  }
  if (def.permissions && def.permissions.length > 0) {
    const supportedPermissions = def.permissions.filter((p) => p.resource === "repo" || p.resource === "rpc");
    if (supportedPermissions.length > 0) {
      md += `### Permissions

`;
      supportedPermissions.forEach((permission, index) => {
        md += renderPermission(permission, index);
      });
      md += "\n";
    }
  }
  if (def.record?.properties && Object.keys(def.record.properties).length > 0) {
    md += `## Properties

`;
    md += renderProperties(def.record.properties, def.record.required);
  }
  if (def.properties && Object.keys(def.properties).length > 0) {
    md += `## Properties

`;
    md += renderProperties(def.properties, def.required);
  }
  if (def.parameters?.properties && Object.keys(def.parameters.properties).length > 0) {
    md += `## Parameters

`;
    md += renderProperties(def.parameters.properties, def.parameters.required);
  }
  if (def.input) {
    md += `## Input

`;
    md += `**Encoding:** \`${def.input.encoding}\`

`;
    if (def.input.schema?.ref) md += `**Schema:** \`${def.input.schema.ref}\`

`;
    if (def.input.schema?.refs) {
      md += `**Schema (union):**
`;
      md += formatUnionRefs(def.input.schema.refs);
    }
    if (def.input.schema?.properties && Object.keys(def.input.schema.properties).length > 0) {
      md += renderProperties(def.input.schema.properties, def.input.schema.required);
    }
  }
  if (def.output) {
    md += `## Output

`;
    md += `**Encoding:** \`${def.output.encoding}\`

`;
    if (def.output.schema?.ref) md += `**Schema:** \`${def.output.schema.ref}\`

`;
    if (def.output.schema?.refs) {
      md += `**Schema (union):**
`;
      md += formatUnionRefs(def.output.schema.refs);
    }
    if (def.output.schema?.properties && Object.keys(def.output.schema.properties).length > 0) {
      md += renderProperties(def.output.schema.properties, def.output.schema.required);
    }
  }
  if (def.errors && def.errors.length > 0) {
    md += `## Errors

`;
    for (const error of def.errors) {
      md += `- **${error.name}**`;
      if (error.description) md += `: ${error.description}`;
      md += "\n";
    }
    md += "\n";
  }
  if (def.refs) {
    md += `### Union Types

`;
    md += formatUnionRefs(def.refs);
  }
  const defConstraints = [];
  if (def.minLength !== void 0) defConstraints.push(`minLength: ${def.minLength}`);
  if (def.maxLength !== void 0) defConstraints.push(`maxLength: ${def.maxLength}`);
  if (def.maxGraphemes !== void 0) defConstraints.push(`maxGraphemes: ${def.maxGraphemes}`);
  if (def.minGraphemes !== void 0) defConstraints.push(`minGraphemes: ${def.minGraphemes}`);
  if (def.minimum !== void 0) defConstraints.push(`min: ${def.minimum}`);
  if (def.maximum !== void 0) defConstraints.push(`max: ${def.maximum}`);
  if (def.maxSize !== void 0) defConstraints.push(`maxSize: ${def.maxSize}`);
  if (def.accept) defConstraints.push(`accept: [${def.accept.join(", ")}]`);
  if (def.closed) defConstraints.push(`closed: true`);
  if (defConstraints.length > 0) md += `**Constraints:** ${defConstraints.join(", ")}

`;
  if (def.enum) md += `**Enum:** [${def.enum.join(", ")}]

`;
  if (def.const) md += `**Const:** ${def.const}

`;
  if (def.knownValues) md += `**Known Values:** [${def.knownValues.join(", ")}]

`;
  if (def.items) {
    md += `### Items

`;
    md += `${formatType(def.items)}${formatConstraints(def.items)}
`;
    if (def.items.refs) {
      md += formatUnionRefs(def.items.refs);
    }
  }
  return md;
}
function renderSchema(schema) {
  let md = `# ${schema.id}

`;
  md += `**Lexicon Version:** ${schema.lexicon}

`;
  if (schema.description) md += `${schema.description}

`;
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
function defSummary(name, def) {
  const parts = [def.type];
  if (def.key) parts.push(`key: ${def.key}`);
  if (def.description) parts.push(def.description);
  return parts.join(" \xB7 ");
}

// src/lib/alfred.ts
var import_node_fs = require("node:fs");
var import_node_os = require("node:os");
var import_node_path = require("node:path");
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
function cacheDir() {
  const dir = process.env.alfred_workflow_cache || (0, import_node_path.join)((0, import_node_os.tmpdir)(), "pdsls-alfred");
  (0, import_node_fs.mkdirSync)(dir, { recursive: true });
  return dir;
}
function writeQuickLook(id, markdown) {
  const path = (0, import_node_path.join)(cacheDir(), `${sanitize(id)}.html`);
  (0, import_node_fs.writeFileSync)(path, htmlDocument(markdownToHtml(markdown)));
  return path;
}
function sanitize(id) {
  return id.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 120);
}
function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function inline(text) {
  let out = escapeHtml(text);
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return out;
}
function markdownToHtml(md) {
  const lines = md.split("\n");
  const html = [];
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
function htmlDocument(body) {
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

// src/lexicon.ts
var lexiconAuthorityResolver = new NodeDnsLexiconAuthorityResolver();
var schemaResolver = new LexiconSchemaResolver({ didDocumentResolver });
async function main() {
  const nsid2 = (process.argv[2] ?? "").trim();
  if (!nsid2) {
    output([infoItem("View Lexicon", "Enter an NSID, e.g. app.bsky.feed.post")]);
    return;
  }
  if (!isNsid(nsid2)) {
    output([infoItem("Invalid NSID", `"${nsid2}" is not a valid lexicon NSID`)]);
    return;
  }
  const authority = await lexiconAuthorityResolver.resolve(nsid2);
  if (!isAtprotoDid(authority)) {
    output([infoItem("Resolution failed", "Could not resolve lexicon authority DID")]);
    return;
  }
  const result = await schemaResolver.resolve(authority, nsid2);
  const schema = result.schema;
  const markdown = renderSchema(schema);
  const json = JSON.stringify(schema, null, 2);
  const quicklook = writeQuickLook(`lexicon-${nsid2}`, markdown);
  const pdslsUrl = `https://pds.ls/at://${authority}/com.atproto.lexicon.schema/${nsid2}#schema`;
  const items = [
    buildItem({
      uid: nsid2,
      title: schema.id,
      subtitle: `Lexicon v${schema.lexicon}${schema.description ? ` \xB7 ${schema.description}` : ""}`,
      open: pdslsUrl,
      copyCmd: { value: json, label: "Copy schema JSON" },
      copyAlt: { value: markdown, label: "Copy markdown" },
      quicklook
    })
  ];
  for (const [name, def] of Object.entries(schema.defs)) {
    items.push(
      buildItem({
        title: `${name === "main" ? "main" : name} (${def.type})`,
        subtitle: defSummary(name, def),
        open: pdslsUrl,
        copyCmd: { value: JSON.stringify(def, null, 2), label: "Copy def JSON" },
        quicklook
      })
    );
  }
  output(items);
}
main().catch((err2) => output([infoItem("Lexicon load failed", err2?.message ?? String(err2))]));
