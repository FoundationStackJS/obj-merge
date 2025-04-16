'use strict';

const isPlainObj = require('is-plain-obj');
const kindOf     = require('kind-of');

function isMergeable(val) {
  return isPlainObj(val);
}

function mergeTwo(target, source, depth, maxDepth) {
  if (depth > maxDepth) return Object.assign({}, target, source);
  const out = Object.assign({}, target);
  for (const key of Object.keys(source)) {
    const sv = source[key];
    const tv = out[key];
    if (isMergeable(sv) && isMergeable(tv)) {
      out[key] = mergeTwo(tv, sv, depth + 1, maxDepth);
    } else {
      out[key] = kindOf(sv) === 'array' ? sv.slice() : sv;
    }
  }
  return out;
}

module.exports = { isMergeable, mergeTwo };
