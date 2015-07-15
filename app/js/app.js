"use strict";

import angular from 'angular';
import 'angular-route';
import TwitterButton from './directives/twitterButtonDirective';
import TweetVideo from './directives/TweetVideoDirective'

function setup($routeProvider) {
    $routeProvider .when('/', {
        templateUrl: 'templates/pages/home.html'
    }).otherwise({ redirectTo: '/' });
};

setup.$inject = ['$routeProvider'];

angular.module('NowPlayingApp', ['ngRoute'])
    .config(['$routeProvider', setup])
    .directive('twitterButton',  () => new TwitterButton())
    .directive('tweetVideo',  () => new TweetVideo());
