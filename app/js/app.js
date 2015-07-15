"use strict";

import angular from 'angular';
import 'angular-route';
import twitterApi from 'twitter-node-client';

import TwitterButton from './directives/twitterButtonDirective';
import TweetVideo from './directives/TweetVideoDirective';
import TwitterClient from './libs/twitterConnect';

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



var tweet = new TwitterClient(twitterApi);

tweet.postTweetInNowPlayingAccount("TEST COMMENT");