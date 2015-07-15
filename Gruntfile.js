'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Watches for changes in files and runs certain Grunt tasks.
        watch: {
            js: {
                files: ['app/js/*.js','app/js/directives/*.js'],
                tasks: ['compile-js']
            },
            less: {
                files: ['app/**/*.less'],
                tasks: ['compile-less']
            }
        },
        // Compiles ES6 modules so we can use it in the browser.
        // I am using its transform option so it will also transpile the code from ES6 to JavaScript with Babel.
        browserify: {
            dist: {
                files: {
                    'app/js/dist/nowplaying.js': ['app/js/app.js'],
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
                src: 'app/js/dist/nowplaying.js',
                dest: 'app/js/dist/nowplaying.min.js'
            }
        },

        less: {
            development: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "app/styles/nowplaying.css": "app/styles/less/nowplaying.less"
                }
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'app/styles',
                    src: ['*.css', '!*.min.css'],
                    dest: 'app/styles',
                    ext: '.min.css'
                }]
            }
        }


    });

    //libs
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    //custom taks
    grunt.registerTask('compile-js',['browserify','uglify']);
    grunt.registerTask('compile-less',['less','cssmin']);
    grunt.registerTask('default', ['compile-js']);
    grunt.registerTask('production', ['compile-js','less','cssmin']);

};