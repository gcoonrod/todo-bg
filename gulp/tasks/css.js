/**
 * Created by coonrod on 10/20/14.
 */
var gulp        = require('gulp');
var minifyCSS   = require('gulp-minify-css');
var changed     = require('gulp-changed');
var config      = require('../config').css;

gulp.task('css', function(){
    return gulp.src(config.src)
        .pipe(changed(config.dest))
        .pipe(minifyCSS({keepBreaks: true}))
        .pipe(gulp.dest(config.dest));
});