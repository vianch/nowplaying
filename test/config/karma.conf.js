module.exports = function (config) {
    var externalLibraries = [
        //External Libraries
        'app/js/dist/nowplaying.min.js',
        'node_modules/angular-mocks/angular-mocks.js'
    ];
    var sourceFiles = [

        'test/unit/**/*.js'
    ];
    var coverageFiles = {};

    var allFiles = externalLibraries.concat(sourceFiles);

    for(var i = 0; i< sourceFiles.length; i++){
        coverageFiles[sourceFiles[i]] = 'coverage';
    }
    config.set({
        // base path, that will be used to resolve and to exclude files
        basePath: '../../',

        reporters: ['coverage', 'progress', 'html', 'junit'],

        // web server port
        port: 9999,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // list of files to exclude
        exclude: [],

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 180000,
        browserNoActivityTimeout: 180000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,

        urlRoot: "/",

        frameworks: ['jasmine'],

        //browsers: ['Chrome', 'IE'],
        browsers: ['PhantomJS'],

        // configure coverage reporter
        coverageReporter: {
            reporters: [
                { type: 'html', dir: 'test/reports/unit-test/coverage' },
                { type: 'cobertura', dir: 'test/reports/unit-test/coverage' }
            ]
        },

        htmlReporter:{
            outputFile: 'test/reports/unit-test/htmlReporter.html'
        },

        junitReporter: {
            suite: 'unit',
            outputFile: 'test/reports/unit-test/junit-results.xml'
        },

        preprocessors: {
            'app/js/**/*.js': 'coverage',
        },

        // list of files to load in the browser
        files: allFiles,
        //'app/modules/main/**/*.js': 'coverage',

        plugins: [
            'karma-junit-reporter',
            'karma-htmlfile-reporter',
            'karma-coverage',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-script-launcher',
            'karma-jasmine',
            'karma-teamcity-reporter',
            'karma-ie-launcher',
            'karma-phantomjs-launcher'
        ]
    });
};
