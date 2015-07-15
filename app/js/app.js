"use strict";

import angular from 'angular';
import io from 'socket.io-client';
import 'angular-route';
import twitterApi from 'twitter-node-client';



import TwitterButton from './directives/twitterButtonDirective';
import TweetVideo from './directives/tweetVideoDirective';
import TwitterVideoList from './directives/twitterVideoListDirective.js'


function setup($routeProvider) {
    $routeProvider .when('/', {
        templateUrl: 'templates/pages/home.html'
    }).otherwise({ redirectTo: '/' });
};

function socketEvents ($rootScope) {
    var socket = io.connect('http://localhost:4444');
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
}

setup.$inject = ['$routeProvider'];
socketEvents.$inject = ['$rootScope'];

angular.module('NowPlayingApp', ['ngRoute'])
    .config(['$routeProvider', setup])
    .directive('twitterButton',  () => new TwitterButton())
    .directive('tweetVideo',  () => new TweetVideo())
    .directive('twitterVideoList',  () => new TwitterVideoList())
    .factory('socket', socketEvents);

