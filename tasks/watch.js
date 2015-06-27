'use strict';

var gulp = require('gulp');

module.exports = function () {
  return gulp.watch('./client/styles/**/*.scss', ['sass']);
};
