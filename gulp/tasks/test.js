/**
 * Created by coonrod on 10/20/14.
 */
var gulp        = require('gulp');
var karma       = require('karma').server;

gulp.task('test', function(done){
    karma.start({
        configFile: __dirname + '/../../karma.conf.js',
        singleRun: true
    }, done);
});