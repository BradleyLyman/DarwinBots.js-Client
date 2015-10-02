/**
 * Provides methods for safely interacting with local storage by
 * using a version number to track storage validity.
 * @module util/LocalStorage
 **/

var version = "1";

/**
 * Retrieves the object associated with a key from local storage.
 * Returns undefined if the object doesn't exist or if the version
 * key does not match.
 * If the version key is missing or incorrect then the old data is
 * deleted.
 * @param {String} key - The key to read.
 * @return {Object|undefined}
 **/
module.exports.readValue = function(key) {
  var objString = localStorage[key];
  var obj;

  if (objString === undefined) {
    return; // item doesn't exist, return nothing
  }

  obj = JSON.parse(objString);

  if (obj.version === undefined || obj.version !== version) {
    localStorage.removeItem(key);
    return;
  }

  return obj.payload;
};

/**
 * Writes an object to local storage versioning with the current
 * version.
 * @param {String} key - The key to write.
 * @param {Object} payload - The payload object.
 **/
module.exports.writeValue = function(key, payload) {
  var obj = {
    version : version,
    payload : payload
  };

  localStorage[key] = JSON.stringify(obj);
};
