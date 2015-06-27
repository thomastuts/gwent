var gulp = require('gulp');

gulp.task('serve', ['sass', 'watch', 'bundle'], require('./tasks/serve'));
gulp.task('bundle', require('./tasks/bundle'));
gulp.task('sass', require('./tasks/sass'));
gulp.task('watch', require('./tasks/watch'));

gulp.task('default', ['serve']);
