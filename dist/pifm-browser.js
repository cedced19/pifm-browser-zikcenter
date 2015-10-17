#!/usr/bin/env node
'use strict';
var hapi = require('hapi'),
    pkg = require('./package.json'),
    app = new hapi.Server(),
    path = require('path'),
    fs = require('fs'),
    config = require('./config.json'),
    isUrl = require('is-url'),
    colors = require('colors'),
    ls = require('./lib/ls'),
    current = {name: 'Rock on air!'},
    launch = require('./lib/launch');

if (!isUrl(config.url)) {
    console.log(colors.red('You must set a valid url in config.json file!'));
    process.exit(1);
}

var list = ls(config);

launch.on('new', function (data) {
       current = data;
});

app.connection({ port: config.port });

app.route({
    method: 'GET',
    path: '/api/',
    handler: function (request, reply) {
        reply({
          current: current,
          list: list,
          freq: config.freq
        });
    }
});

app.route({
    method: 'GET',
    path: '/api/refresh/',
    handler: function (request, reply) {
        list = ls(config);
        launch.emit('refresh', list);
        reply(list);
    }
});

app.route({
    method: 'GET',
    path: '/vendor/{param*}',
    handler: {
        directory: {
            path: './vendor/'
        }
    }
});

app.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.file('index.html');
    }
});

app.route({
    method: 'GET',
    path: '/favicon.ico',
    handler: function (request, reply) {
        reply.file('favicon.ico');
    }
});

app.start(function () {
  launch.emit('start', list);
  require('check-update-github')({
      name: pkg.name,
      currentVersion: pkg.version,
      user: 'cedced19'
  }, function (err, lastestVersion, defaultMessage) {
      if (!err) {
        console.log(defaultMessage);
      }
  });
  console.log('Server running at\n  => ' + colors.green('http://localhost:' + config.port) + '\nCTRL + C to shutdown');
});

var io = require('socket.io').listen(app.listener);
io.sockets.on('connection', function(socket){
    launch.on('new', function (data) {
       socket.emit('new', data);
    });
});
