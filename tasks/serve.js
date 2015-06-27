'use strict';

var browserSync = require('browser-sync');

module.exports = function () {
  browserSync.init({
    files: [
      './client/src/bundle.js',
      './client/styles/app.css',
      './client/index.html'
    ],
    notify: false,
    ghostMode: false,
    server: {
      baseDir: ['./client', './']
    }
  })
};
