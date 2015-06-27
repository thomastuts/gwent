var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');

module.exports = function () {
  var processors = [
    autoprefixer({browsers: ['last 2 versions']}),
    mqpacker,
    csswring
  ];

  return gulp.src('./client/styles/app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(postcss(processors))
    .pipe(gulp.dest('client/styles'));
};
