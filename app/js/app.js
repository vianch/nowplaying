"use strict";

import angular from 'angular';
import 'angular-route';
import TwitterButton from './directives/twitterButton';

function setup($routeProvider) {
    $routeProvider .when('/', {
        templateUrl: 'templates/pages/home.html'
    }).otherwise({ redirectTo: '/' });
};

setup.$inject = ['$routeProvider'];

angular.module('NowPlayingApp', ['ngRoute'])
    .config(['$routeProvider', setup])
    .directive('twitterButton',  () => new TwitterButton());


