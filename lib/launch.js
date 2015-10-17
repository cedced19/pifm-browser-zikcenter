#!/usr/bin/env node
'use strict';
var colors = require('colors'),
    Emitter = require('events').EventEmitter,
    exec = require('child_process').exec,
    config = require('../config.json'),
    findCommand = require('./find-command'),
    list = [],
    lastzik = false,
    currentzik = false;

var ee = new Emitter();

var set = function (zik) {
    lastzik = currentzik;
    currentzik = zik;
    ee.emit('new', currentzik);
    exec(findCommand(config, zik), null, function() {
        random();
    });
};

var random = function () {
    var number = Math.floor(Math.random() * list.length);
    if (currentzik != list[number]) {
        set(list[number]);
    } else {
        random();
    }
};

ee.on('start', function (data) {
    list = data;
    random();
});


ee.on('refresh', function (data) {
     list = data;
});

module.exports = ee;
