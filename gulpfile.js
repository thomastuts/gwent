var gulp = require('gulp');

gulp.task('serve', ['bundle'], require('./tasks/serve'));
gulp.task('bundle', require('./tasks/bundle'));

gulp.task('default', ['serve']);
