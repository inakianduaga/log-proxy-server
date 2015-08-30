/// <reference path="./../../typings/node/node.d.ts" />

module Config.Load {
  export function load() {
    return process.env.SETTINGS_FILE_PATH ? require('process.env.SETTINGS_FILE_PATH') : require('./settings.json');
  }
}

export = Config.Load;
