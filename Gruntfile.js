'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Watches for changes in files and runs certain Grunt tasks.
        watch: {
            js: {
                files: ['app/**/*.js'],
                tasks: ['compile-js']
            }
        },
        // Compiles ES6 modules so we can use it in the browser.
        // I am using its transform option so it will also transpile the code from ES6 to JavaScript with Babel.
        browserify: {
            dist: {
                files: {
                    'app/js/nowplaying.js': ['app/js/app.js'],
                },
                options: {
                    transform: ['babelify'],
                    browserifyOptions: {
                        debug: true
                    }
                }
            }
        },

        uglify: {
            options: {
                sourceMap: false,
                banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'app/js/nowplaying.js',
                dest: 'app/js/nowplaying.min.js'
            }
        },


    });


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.registerTask('compile-js',['browserify','uglify'])
    grunt.registerTask('default', ['compile-js']);
    grunt.registerTask('production', ['compile-js']);

};