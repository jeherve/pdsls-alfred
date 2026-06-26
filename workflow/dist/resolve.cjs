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

// node_modules/@atcute/lexicons/dist/syntax/handle.js
var isValidLabel = (input, start, end) => {
  const len = end - start;
  if (len === 0 || len > 63) {
    return false;
  }
  const first = input.charCodeAt(start);
  if (!isAsciiAlphaNum(first)) {
    return false;
  }
  if (len > 1) {
    if (!isAsciiAlphaNum(input.charCodeAt(end - 1))) {
      return false;
    }
    for (let j = start + 1; j < end - 1; j++) {
      const c = input.charCodeAt(j);
      if (!isAsciiAlphaNum(c) && c !== 45) {
        return false;
      }
    }
  }
  return true;
};
var isHandle = /* @__NO_SIDE_EFFECTS__ */ (input) => {
  if (typeof input !== "string") {
    return false;
  }
  const len = input.length;
  if (len < 3 || len > 253) {
    return false;
  }
  let labelStart = 0;
  let labelCount = 0;
  let lastLabelStart = 0;
  for (let i = 0; i <= len; i++) {
    if (i === len || input.charCodeAt(i) === 46) {
      if (!isValidLabel(input, labelStart, i)) {
        return false;
      }
      lastLabelStart = labelStart;
      labelStart = i + 1;
      labelCount++;
    }
  }
  if (labelCount < 2) {
    return false;
  }
  return isAsciiAlpha(input.charCodeAt(lastLabelStart));
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
    for (const [literal, options] of literals) {
      byLiteral.set(literal, options[0][MATCHER_SYMBOL]);
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
    for (const [literal, options] of literals) {
      byLiteral.set(literal, options.map((t) => t[MATCHER_SYMBOL]));
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
var null_ = /* @__PURE__ */ singleton("null", TAG_NULL, (v) => v === null ? void 0 : ISSUE_EXPECTED_NULL);
var undefined_ = /* @__PURE__ */ singleton("undefined", TAG_UNDEFINED, (v) => v === void 0 ? void 0 : ISSUE_EXPECTED_UNDEFINED);
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
var getAtprotoHandle = (doc) => {
  const alsoKnownAs = doc.alsoKnownAs;
  if (!alsoKnownAs) {
    return null;
  }
  const PREFIX2 = "at://";
  for (let idx = 0, len = alsoKnownAs.length; idx < len; idx++) {
    const aka = alsoKnownAs[idx];
    if (!aka.startsWith(PREFIX2)) {
      continue;
    }
    const raw = aka.slice(PREFIX2.length);
    if (!isHandle(raw)) {
      return void 0;
    }
    return raw;
  }
  return null;
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
var import_promises = __toESM(require("node:dns/promises"), 1);
var SUBDOMAIN = "_atproto";
var PREFIX = "did=";
var NodeDnsHandleResolver = class {
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
  async resolve(handle, options) {
    let results;
    try {
      const signal = options?.signal;
      const resolver = this.#resolver ?? import_promises.default;
      results = await resolver.resolveTxt(`${SUBDOMAIN}.${handle}`);
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
      if (!data.startsWith(PREFIX)) {
        continue;
      }
      for (let j = i + 1; j < il; j++) {
        const data2 = records[j];
        if (data2.startsWith(PREFIX)) {
          throw new AmbiguousHandleError(handle);
        }
      }
      const did = data.slice(PREFIX.length);
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
function normalizeQuery(raw) {
  const trimmed = raw.trim();
  return trimmed.startsWith("@") ? trimmed.slice(1) : trimmed;
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

// src/lib/render.ts
function renderDidDocMarkdown(did, handle, doc) {
  let md = `# ${handle ? `@${handle}` : did}

**DID:** \`${did}\`

`;
  if (doc.alsoKnownAs?.length) {
    md += `---

## Also Known As

${doc.alsoKnownAs.map((a) => `- ${a}`).join("\n")}

`;
  }
  if (doc.service?.length) {
    md += `---

## Services

`;
    for (const svc of doc.service) {
      const type = Array.isArray(svc.type) ? svc.type[0] : svc.type;
      const endpoint = typeof svc.serviceEndpoint === "string" ? svc.serviceEndpoint : JSON.stringify(svc.serviceEndpoint);
      md += `- **${type}**: ${endpoint}
`;
    }
    md += "\n";
  }
  if (doc.verificationMethod?.length) {
    md += `---

## Verification Methods

`;
    for (const vm of doc.verificationMethod) {
      md += `- **${vm.id.replace(did, "")}**: \`${vm.publicKeyMultibase ?? ""}\`
`;
    }
    md += "\n";
  }
  return md;
}

// src/resolve.ts
async function resolveDid(did) {
  const doc = await didDocumentResolver.resolve(did);
  const handle = getAtprotoHandle(doc) ?? null;
  const docJson = JSON.stringify(doc, null, 2);
  const quicklook = writeQuickLook(`resolve-${did}`, renderDidDocMarkdown(did, handle, doc));
  const items = [
    buildItem({
      uid: did,
      title: handle ? `@${handle}` : did,
      subtitle: handle ? did : "DID document",
      open: `https://pdsls.dev/at://${did}#identity`,
      copyCmd: { value: did, label: "Copy DID" },
      copyAlt: { value: docJson, label: "Copy DID document JSON" },
      quicklook
    })
  ];
  for (const aka of doc.alsoKnownAs ?? []) {
    items.push(
      buildItem({
        title: aka,
        subtitle: "Also Known As",
        copyCmd: { value: aka, label: "Copy value" }
      })
    );
  }
  for (const svc of doc.service ?? []) {
    const type = Array.isArray(svc.type) ? svc.type[0] : svc.type;
    const endpoint = typeof svc.serviceEndpoint === "string" ? svc.serviceEndpoint : JSON.stringify(svc.serviceEndpoint);
    items.push(
      buildItem({
        title: endpoint,
        subtitle: `Service \xB7 ${type}`,
        open: typeof svc.serviceEndpoint === "string" ? svc.serviceEndpoint : void 0,
        copyCmd: { value: endpoint, label: "Copy endpoint" }
      })
    );
  }
  for (const vm of doc.verificationMethod ?? []) {
    items.push(
      buildItem({
        title: vm.publicKeyMultibase ?? vm.id,
        subtitle: `Verification Method \xB7 ${vm.id.replace(did, "")}`,
        copyCmd: { value: vm.publicKeyMultibase ?? vm.id, label: "Copy key" }
      })
    );
  }
  return items;
}
async function resolveHandle(handle) {
  const [dnsSettled, httpSettled] = await Promise.allSettled([
    dnsResolver.resolve(handle),
    httpResolver.resolve(handle)
  ]);
  const dns2 = dnsSettled.status === "fulfilled" ? { success: true, did: dnsSettled.value } : { success: false, error: dnsSettled.reason?.message ?? "Failed" };
  const http = httpSettled.status === "fulfilled" ? { success: true, did: httpSettled.value } : { success: false, error: httpSettled.reason?.message ?? "Failed" };
  const resolvedDid = dns2.did ?? http.did;
  const match = dns2.success && http.success ? dns2.did === http.did : null;
  const items = [
    buildItem({
      uid: handle,
      title: `@${handle}`,
      subtitle: resolvedDid ? `Resolves to ${resolvedDid}` : "Could not resolve handle",
      open: resolvedDid ? `https://pdsls.dev/at://${resolvedDid}` : void 0,
      copyCmd: resolvedDid ? { value: resolvedDid, label: "Copy DID" } : void 0
    }),
    buildItem({
      title: dns2.success ? dns2.did : dns2.error,
      subtitle: `DNS (_atproto TXT) \xB7 ${dns2.success ? "OK" : "Failed"}`,
      copyCmd: dns2.success ? { value: dns2.did, label: "Copy DID (DNS)" } : void 0
    }),
    buildItem({
      title: http.success ? http.did : http.error,
      subtitle: `HTTP (.well-known) \xB7 ${http.success ? "OK" : "Failed"}`,
      copyCmd: http.success ? { value: http.did, label: "Copy DID (HTTP)" } : void 0
    })
  ];
  if (match !== null) {
    items.push(
      infoItem(
        match ? "DNS and HTTP match" : "DNS and HTTP mismatch!",
        match ? "Validation: Valid" : "Validation: Warning"
      )
    );
  }
  return items;
}
async function main() {
  const query = normalizeQuery(process.argv[2] ?? "");
  if (!query) {
    output([infoItem("Resolve Identity", "Enter a DID (did:plc:\u2026) or handle (user.bsky.social)")]);
    return;
  }
  if (isAtprotoDid(query)) {
    output(await resolveDid(query));
  } else if (isHandle(query)) {
    output(await resolveHandle(query));
  } else {
    output([infoItem("Invalid input", "Enter a valid DID or handle")]);
  }
}
main().catch((err2) => output([infoItem("Resolution failed", err2?.message ?? String(err2))]));
