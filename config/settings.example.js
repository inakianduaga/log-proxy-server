'use strict';

//-- EXAMPLE SETTINGS FILE. Copy your actual settings to `settings.js` file

/**
 * Setting groups
 * We can use any of the groups defined above as a log route parameter.
 */
exports.settings = {

  //This group disables the hipchat logging
  noHipchat : {
    transports: {
      hipchat: {
        enabled:  false
      }
    }
  },

  //This group disables the hipchat logging
  angularApp : {
    transports:                 {
      rsyslog: {
        enabled:  true,
        settings: {
          tag:      'angularApp'
        }
      },
      hipchat: {
        enabled:  true,
        settings: {
          //Required parameters
          token:         process.env.HIPCHAT_TOKEN,
          room:          'angular-app-room'
        }
      }
    }
  }

};
