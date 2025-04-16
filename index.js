'use strict';

const { createProfiler }    = require('@signalmetric/benchmarked');
const debug                 = require('debug')('obj-merge');
const ms                    = require('ms');
const { isMergeable, mergeTwo } = require('./lib/client');

const MAX_DEPTH    = 20;
const DEPTH_WARN_MS = 50;

/**
 * Recursively merge plain objects. Returns a new object; does not mutate inputs.
 *
 * @param  {...object} sources
 * @returns {object}
 */
function merge(...sources) {
  const p = createProfiler('merge').start();

  let result = {};
  for (const src of sources) {
    if (!isMergeable(src)) continue;
    result = mergeTwo(result, src, 0, MAX_DEPTH);
  }

  const elapsed = p.end();
  if (elapsed > DEPTH_WARN_MS) {
    debug('merge took %s — consider shallower structures', ms(elapsed));
  }

  return result;
}

module.exports = { merge };
