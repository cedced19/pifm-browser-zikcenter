#!/usr/bin/env node
'use strict';

module.exports = function (config, zik) {
  var pifm = process.cwd() + '/lib/pifm-' + config.version;
  return 'sox -t mp3 "' + config.url + zik.uri.replace('./', '/') + '" -t wav -  | sudo ' + pifm + ' -freq ' + config.freq + ' -rt "PIFM: '+ zik.name + '" -audio -';
};
