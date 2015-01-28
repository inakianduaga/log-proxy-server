'use strict';

//-- Useful js object methods

/**
 * A function to take a string written in dot notation style, and use it to
 * delete a nested object property inside of an object.
 *
 * @link https://gist.github.com/jasonrhodes/2321581
 *
 * @param String nested A dot notation style parameter reference (ie "urls.small")
 * @param Object object (optional) The object to search
 *
 * @return {Boolean}
 */
function deleteProperty( propertyName, object ) {
  var parts = propertyName.split( '.' ),
      length = parts.length,
      i,
      property = object || this;

  for ( i = 0; i < length; i++ ) {

    //No matches, bail out
    if (! (parts[i] in property)) {
      return false;
    }

    //Delete when on last key
    if(i === length - 1) {
      delete property[parts[i]];

      return true;
    }

    //Set and continue to next step
    property = property[parts[i]];
  }

  return property;
}

/**
 * Removes keys from an object based on dot-notation strings
 *
 * @param {Object} object
 * @param {Array} dottedKeysArray
 *
 * @returns {Object}
 */
function removeKeysFromObject(object, dottedKeysArray) {

  //Remove private keys
  dottedKeysArray.forEach(function(keyString) {
    deleteProperty(keyString, object);
  });

  return object;
}


module.exports = {
  deleteProperty : deleteProperty,
  removeKeysFromObject : removeKeysFromObject,
};
