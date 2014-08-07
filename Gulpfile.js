var gulp = require('gulp');

var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var templateCache = require('gulp-angular-templatecache');
var gconcat = require('gulp-concat');
var jshint = require('gulp-jshint');

gulp.task('scripts', function(){
    gulp.src(['!./app/**/*_test.js',
        './app/application.js',
        './app/**/*.js'])
        .pipe(gconcat('app.js'))
        .pipe(gulp.dest('./build'));
});

gulp.task('templates',function(){
    gulp.src(['!./app/index.html',
        './app/**/*.html'])
        .pipe(templateCache('templates.js',{standalone:true}))
        .pipe(gulp.dest('./build'));
});

gulp.task('vendorJS', function(){
    gulp.src(['!./bower_components/**/*.min.js',
        './bower_components/angular/angular.js',
        './bower_components/lodash/**/lodash.js',
        './bower_components/**/*.js'])
        .pipe(gconcat('lib.js'))
        .pipe(gulp.dest('./build'));
});

gulp.task('vendorCSS', function(){
    gulp.src(['!./bower_components/**/*.min.css',
        './bower_components/**/*.css'])
        .pipe(gconcat('lib.css'))
        .pipe(gulp.dest('./build'));
});

gulp.task('copy-index', function() {
    gulp.src('./app/index.html')    
        .pipe(gulp.dest('./build'));
});

gulp.task('copy-package', function() {
    gulp.src('package.json')
        .pipe(gulp.dest('./build'));
})

gulp.task('sass', function() {
    return gulp.src('app/sass/*.scss')
        .pipe(plumber())
        .pipe(sass({style: 'expanded'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('build'));
});

gulp.task('copy-node-modules', function() {
    return gulp.src('node_modules/**/*')
        .pipe(gulp.dest('./build/node_modules'));
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./app/sass/*.scss', ['sass']);
    gulp.watch('./app/index.html', ['copy-index']);
    gulp.watch('package.json', ['copy-package']);
    gulp.watch(['./app/**/*.js'], ['scripts']);
    gulp.watch(['!./app/index.html','./app/**/*.html'], ['templates']);
    gulp.watch([
        'build/**/*.html',
        'build/**/*.js',
        'build/**/*.css',
        '!build/node_modules/**/*'
    ]).on('change', livereload.changed)
});

gulp.task('default', [
    'scripts', 
    'templates', 
    'copy-index', 
    'copy-package', 
    'copy-node-modules',
    'sass',
    'vendorJS', 
    'vendorCSS',
    'watch'
]);
