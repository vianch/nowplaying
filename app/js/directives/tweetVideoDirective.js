"use strict";

class TweetVideoController {
    constructor($scope,socket) {
        this.scope = $scope;
        this.socket = socket;
        this.initializeScope();
    }

    initializeScope() {
        this.scope.videoUrl = "";
        this.scope.comment = "";
        this.scope.postTweet = () => this.postTweet();
    }

    postTweet() {
        let tweetDataToSed = {
            videoUrl: this.scope.videoUrl,
            comment: this.scope.comment
        };
        this.socket.emit('tweet-io:post', tweetDataToSed);
        this.socket.on('tweet-io:post',  (data) => {
            if(data) {
                console.log("Successfull post data");
            }
        });
    }
}

export default class TweetVideo {
    constructor() {
        this.templateUrl = 'templates/directives/tweet-video.html';
        this.restrict = 'E';
        this.scope = {
        };
        this.controller = [
            "$scope",
            "socket",
            ($scope,socket) => {
                new TweetVideoController($scope,socket);
            }
        ];
    }
}
