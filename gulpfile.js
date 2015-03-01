var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat');

var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = [
  'components/scripts/rclick.js', // Script to handle right-click event
  'components/scripts/pixgrid.js', // Pix grid script
  'components/scripts/tagline.js', // Contains jQuery declaration (Compiled from coffeescript)
  'components/scripts/template.js' // Contains Mustache declaration
];
var sassSources = ['components/sass/style.scss'];
var htmlSources = ['builds/development/*.html'];
var jsonSources = ['builds/development/js/*.json'];

// Compile each coffeescript file into 'components/scripts/' <NAME OF FILE>.js eg. tagline.js
gulp.task('coffee', function() {
  gulp.src(coffeeSources)
    .pipe(coffee({ bare: true })
    .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'))
});

//Concat all javascript files in 'components/scripts/' into one single file in 'builds/development/js/script.js'
gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js')) // Concat all js scripts
    .pipe(browserify()) // Send concatenated script.js to browserify()
    .pipe(gulp.dest('builds/development/js'))
    .pipe(connect.reload())
});

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      image: 'builds/development/images',
      style: 'expanded'
    })
    .on('error', gutil.log))
    .pipe(gulp.dest('builds/development/css'))
    .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['js']);
  gulp.watch('components/sass/*.scss', ['compass']);
  gulp.watch(htmlSources, ['html']);
  gulp.watch(jsonSources, ['json']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'builds/development/',
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src(htmlSources)
    .pipe(connect.reload())
});

gulp.task('json', function() {
  gulp.src(jsonSources)
    .pipe(connect.reload())
});

gulp.task('log', function() {
  gutil.log(gutil.colors.magenta('Workflows are awesome!!!'))
});

gulp.task('default', ['html', 'json', 'coffee', 'js', 'compass', 'connect', 'watch', 'log']);