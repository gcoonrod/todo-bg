/**
 * Created by coonrod on 10/17/14.
 */
var gulp = require('gulp');

var paths = {
    dev_infrastructure: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/backbone/backbone.js',
        'node_modules/underscore/underscore.js',
        'node_modules/todomvc-common/base.js'
    ],
    prod_infrastructure: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/backbone/backbone-min.js',
        'node_modules/underscore/underscore-min.js'
    ],
    scripts: [
        'src/js/**/*.js'
    ],
    images: [
        'src/img/*'
    ],
    css: [
        'src/css/*.css',
        'node_modules/todomvc-common/*.css'
    ],
    dist: [
        'dist/'
    ],
    src: [
        'src/'
    ]
};

gulp.task('copy-dev-infra', function(){
    gulp.src(paths.dev_infrastructure)
        .pipe(gulp.dest('src/lib/'));
});

gulp.task('copy-prod-deps', function(){
    gulp.src(paths.images)
        .pipe(gulp.dest('dist/img'));

    gulp.src(paths.css)
        .pipe(gulp.dest('dist/css'));
});