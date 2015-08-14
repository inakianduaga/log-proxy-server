'use strict';

/**
 * Miscellaneous controller
 */
module Controllers.Miscellaneous {

  /*
   * Return an empty 200 response
   */
  export function healthCheck(req, res) {
    res.end();
  }

};

export = Controllers.Miscellaneous;