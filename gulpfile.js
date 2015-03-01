var gulp = require('gulp'),
    gutil = require('gulp-util');

gulp.task('log', function() {
  gutil.log(gutil.colors.magenta('Workflows are awesome!!!'))
});

gulp.task('default', ['log']);

