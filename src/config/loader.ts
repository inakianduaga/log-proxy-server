/// <reference path="./../../typings/node/node.d.ts" />

module Config.Load {
  export function load() {
    return require('./settings.json');
  }
}

export = Config.Load;
