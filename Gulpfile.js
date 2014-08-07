var gulp = require('gulp');

var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');

gulp.task('sass', function() {
    return gulp.src('app/sass/*.scss')
        .pipe(sass({style: 'expanded'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('app/css'));
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('app/sass/*.scss', ['sass']);
    gulp.watch('app/**').on('change', livereload.changed)
});

gulp.task('default', ['watch']);