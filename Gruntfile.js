'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Watches for changes in files and runs certain Grunt tasks.
        watch: {
            js: {
                files: ['app/**/*.js'],
                tasks: ['browserify']
            }
        },
        // Compiles ES6 modules so we can use it in the browser.
        // I’m using its transform option so it will also transpile the code from ES6 to JavaScript with Babel.
        browserify: {
            dist: {
                files: {
                    'dev/app.js': ['app/js/app.js'],
                },
                options: {
                    transform: ['babelify'],
                    browserifyOptions: {
                        debug: true
                    }
                }
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['watch']);

};