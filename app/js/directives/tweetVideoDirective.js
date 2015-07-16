"use strict";

class TweetVideoController {
    constructor($scope,socket) {
        this.scope = $scope;
        this.socket = socket;
        this.initializeScope();
    }

    initializeScope() {
        this.resetForm();
        this.scope.updateMessage = "";
        this.scope.showUpdateError = false;
        this.scope.showSucess = false;
        this.scope.postTweetAction = () => this.postTweetAction();
    }

    postTweetAction() {
        let commentLength = this.scope.comment.length;
        let tweetLength = this.scope.videoUrl.length + commentLength + 12;
        if(tweetLength <= 140) {
            if(commentLength > 2 && this.isValidYoutubeUrl()) {
                this.scope.showSucess = false;
                this.postTweetEvent();
            } else {
                this.postTweetErrorHandler("You need a valid youtube url or valid comment");
            }
        }
    }

    postTweetEvent() {
        let tweetDataToSed = { videoUrl: this.scope.videoUrl, comment: this.scope.comment };
        this.socket.emit('tweet-io:post', tweetDataToSed);
        this.socket.on('tweet-io:post',  (data) => {
            this.socket.emit('tweet-io:start', true);
            if(data) {
                this.scope.showSucess = true;
                this.scope.showUpdateError = false;
                this.resetForm();
            } else {
                this.postTweetErrorHandler("Error trying to update status");
            }
        });
    }

    postTweetErrorHandler(message) {
        this.scope.showUpdateError = true;
        this.scope.showSucess = false;
        this.scope.updateMessage = message;
    }

    isValidYoutubeUrl() {
       return this.scope.videoUrl.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
    }

    resetForm() {
        this.scope.videoUrl = "";
        this.scope.comment = "";
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
