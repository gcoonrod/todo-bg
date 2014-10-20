/**
 * Created by coonrod on 10/20/14.
 */
var dest = './dist';
var src = './src';

module.exports = {
    browserSync: {
//        server: {
//            baseDir: [dest, src]
//        },
        proxy: "localhost:4711",
        files: [
            dest + '/**'
        ]
    },
    server: {
        script: './bin/server.js',
        ext: 'js html',
        env: { 'NODE_ENV': 'development'},
        nodeArgs: ['--debug']
    },
    images: {
        src: src + "/img/**",
        dest: dest + "/img"
    },
    css: {
        src: src + "/css/**",
        dest: dest + "/css"
    },
    browserify: {
        debug: true,
        bundleConfigs: [{
            entries: './src/main.js',
            dest: dest + '/js',
            outputName: 'app.js'
        }]
    }
};