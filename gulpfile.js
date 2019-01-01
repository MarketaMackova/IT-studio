/*
gulp.task - define task
gulp.src - points to files or folders
gulp.dest - where to place the compiled files
gulp.watch - watch files folders

gulp.task('default', function(){
    //some code here
    });
*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var sassFiles = 'scss/**/*.scss';
var cssDest = 'css_compiled';


 // start browser sync
 gulp.task('browser-sync', function(){
    browserSync.init({
        server: {
            baseDir: "../IT-studio-frontend"
        }
    }); 
 });

// all scss files goes into css, task: gulp sass
gulp.task('sass',function(){
    gulp.src(sassFiles)
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest(cssDest))
        .pipe(browserSync.stream());    
});

// css file is uglifyied, task: gulp uglify
gulp.task('uglify', function () {
  gulp.src('css_compiled/*.css')
    .pipe(uglifycss({
      "uglyComments": true
    }))
    .pipe(gulp.dest('css_dist/'));
});


// all scss files goes into css automatically + uglify, deafult task: gulp
gulp.task('run',['sass','uglify']);


gulp.task('watch',function(){
    gulp.watch(sassFiles, ['sass']);
    gulp.watch('css_compiled/*.css', ['uglify']);        
});

gulp.task('default',['run','browser-sync','watch']);

