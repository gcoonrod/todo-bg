/**
 * Created by coonrod on 10/20/14.
 */
/* Notes:
 - gulp/tasks/browserify.js handles js recompiling with watchify
 - gulp/tasks/browserSync.js watches and reloads compiled files
 */

var gulp  = require('gulp');
var config= require('../config');

gulp.task('watch', ['setWatch', 'browserSync', 'serve'], function() {
    gulp.watch(config.css.src,   ['css']);
    gulp.watch(config.images.src, ['images']);
});