var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('sass', function () {
  return gulp.src('css/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('css'));
});

gulp.task('watch', ['sass'] ,function () {
  gulp.watch('css/scss/**/*.scss', ['sass']);
});