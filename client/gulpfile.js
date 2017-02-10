'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
 
gulp.task('sass', function () {
  return gulp.src(['./styles/src/main.scss', './styles/src/console-styles.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./styles/dist'));
});
 
//Tulyakov: console [S]
/*gulp.task('sass', function () {
  return gulp.src('./styles/src/console-styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./styles/dist'));
});*/
 //Tulyakov:console [E]

gulp.task('sass:watch', function () {
  gulp.watch('./styles/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'sass:watch']);
