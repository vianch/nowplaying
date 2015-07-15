"use strict";

class TwitterVideoListController {
    constructor($scope,socket) {
        this.scope = $scope;
        this.socket = socket;
        this.initializeScopeData();
        this.findTweets();
    }

    initializeScopeData() {
        this.scope.tweets = [];
    }

    findTweets() {
        this.socket.emit('tweet-io:start', true);

        this.socket.on('tweet-io:tweets',  (data) => {
            console.log(data);
            this.scope.tweets = data;
        });
    }
}

export default class TwitterVideoList {
    constructor() {
        this.templateUrl = 'templates/directives/twitter-video-list.html';
        this.restrict = 'E';
        this.scope = {
        };
        this.controller = [
            "$scope",
            "socket",
            ($scope,socket) => {
                new TwitterVideoListController($scope,socket);
            }
        ];
    }
}
