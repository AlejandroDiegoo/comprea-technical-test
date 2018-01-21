
const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const sass = require('gulp-sass');
const webserver = require('gulp-webserver');

gulp.task('build', ['sass', 'webpack']);

gulp.task('build-full', ['sass', 'webpack', 'run']);

gulp.task('webpack', () => {
  gulp.src('./src/entry.js')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest('./js'));
});

gulp.task('sass', () => {
  gulp.src('./src/css/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css/'));
});

gulp.task('run', () => {
  gulp.src('./')
    .pipe(webserver({
      open: true,
      fallback: './index.html'
    }));
});
