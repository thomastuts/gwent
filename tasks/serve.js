'use strict';

var browserSync = require('browser-sync');

module.exports = function () {
  browserSync.init({
    files: [
      './client/src/bundle.js',
      './client/index.html'
    ],
    notify: false,
    server: {
      baseDir: ['./client', './']
    }
  })
};
