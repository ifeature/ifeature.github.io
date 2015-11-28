'use strict';

var gulp = require('gulp'),
del = require('del'),
runSequence = require('run-sequence'),
path = require('path'),
mqpacker = require('css-mqpacker'),

postcss = require('gulp-postcss'),
atImport = require('postcss-import'),
customProperties = require('postcss-custom-properties'),
nested = require('postcss-nested'),
zindex = require('postcss-zindex'),
cssnano = require('cssnano'),
autoprefixer = require('autoprefixer'),

stylus = require('gulp-stylus'),
jade = require('gulp-jade'),
notify = require('gulp-notify'),
webserver = require('gulp-webserver'),
csscomb = require('gulp-csscomb'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify'),
changed = require('gulp-changed'),
plumber = require('gulp-plumber'),
copy = require('gulp-copy'),
sourcemaps = require('gulp-sourcemaps');

var parametres = {
  source: 'app/',
  build: 'dist/'
}

gulp.task('start', function () {
  gulp.src(parametres.build)
  .pipe(webserver({
    host: 'localhost',
    port: 3001,
    fallback: 'index.html',
    livereload: {enable: true, port: 2345}
  }))
  .pipe(notify('server is running!'));
});

gulp.task('build', function () {
  runSequence('clean', 'templates', 'styles', 'scripts', 'meta');
});

gulp.task('clean', function () {
  del(parametres.build + '*.*', '!' + parametres.build + '.git/');
});

gulp.task('meta', function () {
  gulp.src([parametres.source + '/components/favicon/*.{ico,png}', parametres.source + '/components/meta/*', parametres.source + '/components/fonts/*'])
  .pipe(rename( function (path) {
    path.dirname = "";
    path.basename += "";
  }))
  .pipe(gulp.dest(parametres.build))
  .pipe(notify('meta - OK!'));
});

gulp.task('templates', function() {
  var YOUR_LOCALS = { pretty : true };

  gulp.src(parametres.source + '/templates/*.jade')
  .pipe(plumber())
  .pipe(changed(parametres.build))
  .pipe(jade({
    locals: YOUR_LOCALS
  }))
  .pipe(jade())
  .pipe(gulp.dest(parametres.build))
  .pipe(notify('templates - OK!'));
});

gulp.task('styles', function () {
  var processors = [
  atImport,
  autoprefixer({ browsers: ['last 2 versions'] }),
  customProperties,
  nested,
  mqpacker,
  zindex,
  cssnano
  ];
  gulp.src(parametres.source + '/styles/style.styl')
  .pipe(plumber())
  .pipe(changed(parametres.build))
  .pipe(sourcemaps.init())
  .pipe(stylus({
    paths: [parametres.source + '/styles'],
    compress: true,
    'include css': true
  }))
  .pipe(csscomb())
  .pipe(postcss(processors))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(parametres.build))
  .pipe(notify('styles - OK!'));
});

gulp.task('scripts', function () {
  gulp.src(parametres.source + '/scripts/*.js')
  // .pipe(plumber())
  // .pipe(changed('dost/'))
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(rename( function (path) {
    path.dirname = "";
    path.basename += "";
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(parametres.build))
  .pipe(notify('scripts - OK!'));
});

gulp.task('watch', function () {
  gulp.watch(parametres.source + '/templates/*.jade', ['templates']);
  gulp.watch([parametres.source + '/styles/*.styl', parametres.source + '/libs/**/*.css'], ['styles']);
  gulp.watch(parametres.source + '/scripts/*.js', ['scripts']);
});

gulp.task('default', function () {
  runSequence('build', 'start', 'watch');
});

