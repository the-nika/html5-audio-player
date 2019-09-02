'use strict';

const gulp = require('gulp'),
  { src, dest, parallel, series, watch } = gulp,
  browserSync = require('browser-sync').create(),
  jslint = require('gulp-jslint'),
  sass = require('gulp-sass'),
  sourceMaps = require("gulp-sourcemaps");

var FILES = {
	css: 'css/',
	sass: 'css/sass/**/*.scss',
	'js':'js/main.js',
	'js-folder': 'js/'
};

// Server
function serve( done ) {
  browserSync.init({
    server: {
      baseDir: './'
    },
    notify: false
  });
  done();
}

// Server Reload
function reload( done ) {
  browserSync.reload();
  done();
}

// SASS to CSS
function css(){
  return rc( FILES.sass )
    .pipe( sourceMaps.init() )
    .pipe( sass().on('error', swallowError ) )
    .pipe( sourceMaps.write("./") )    
    .pipe( dest(FILES.css) )
    .pipe( reload );
}

// Watch
function watcher() {
  watch( FILES.sass, sass );
}

// Debug
function swallowError(error) {
  // If you want details of the error in the console
  console.log( error.toString() )
  this.emit( 'end' )
}

exports.serve = serve;
exports.reload = reload;
exports.css = css;
exports.watcher = watcher;

exports.default = parallel( serve, watcher );
