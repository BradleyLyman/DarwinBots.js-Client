/**
 * Contains methods for creating and managing species
 * objects.
 * @module Species
 **/

/**
 * @typedef Species
 * @type {Object}
 * @property {String} name - The species' name.
 * @property {String} rawSource - The species' raw dna source code.
 * @property {Function} dnaCmd  - The species' dna command, this is undefined
 *                                if an error exists.
 * @property {String} error - Error string describing a failure when compiling
 *                            the raw source into the dnaCmd. This only exists
 *                            if dnaCmd is undefined.
 **/

var DarwinBots = require('darwinbots.js');

/**
 * Creates a new species using the provided dna source.
 * @param {String} rawSource - Raw source code for the dna.
 * @return {@type Species} Species built from the rawSource
 **/
module.exports.create = function(rawSource, name) {
  var compiledDna = DarwinBots.compileSource(rawSource);

  return {
    name      : name,
    rawSource : rawSource,
    dnaCmd    : compiledDna.get_ok(),
    error     : compiledDna.get_err()
  };
};




