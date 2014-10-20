/**
 * Created by coonrod on 10/20/14.
 */
var gulp        = require('gulp');
var nodemon     = require('gulp-nodemon');
var config      = require('../config').server;

gulp.task('serve', function(){
    nodemon({
        script: config.script,
        ext: config.ext,
        env: config.env,
        nodeArgs: config.nodeArgs
    })
        .on('restart', function(){
            console.log('restarted!')
        });
});
