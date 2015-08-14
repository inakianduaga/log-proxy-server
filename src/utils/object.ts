'use strict';

// Useful js object methods

module Utils.Objects {

  /**
   * A function to take a string written in dot notation style, and use it to
   * delete a nested object property inside of an object.
   *
   * @link https://gist.github.com/jasonrhodes/2321581
   *
   * @param {String} nested A dot notation style parameter reference (ie "urls.small")
   * @param {Object} object The object to search
   */
  export function deleteProperty( propertyName: string, object: any ) : boolean {
    let parts = propertyName.split( '.' ),
        length = parts.length,
        i: number,
        property = object || this;

    for ( i = 0; i < length; i++ ) {

      // No matches, bail out
      if (! (parts[i] in property)) {
        return false;
      }

      // Delete when on last key
      if (i === length - 1) {
        delete property[parts[i]];
        return true;
      }

      // Set and continue to next step
      property = property[parts[i]];
    }

    return false;
  }

  /**
   * Removes keys from an object based on dot-notation strings
   */
  export function removeKeysFromObject(object: any, dottedKeysArray: string[]): any {

    // Remove private keys
    dottedKeysArray.forEach(function(keyString) {
      deleteProperty(keyString, object);
    });

    return object;
  }

}

export = Utils.Objects;
