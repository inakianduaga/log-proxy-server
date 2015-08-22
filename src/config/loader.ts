/// <reference path="./../../typings/node/node.d.ts" />

module Config.Load {
  export function load() {
    return JSON.parse(require('./settings.json'));
  }
}

export = Config.Load;
