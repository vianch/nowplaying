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
        this.scope.parseTwitterDate = (twitterDate) => this.parseTwitterDate(twitterDate);
    }

    findTweets() {
        this.socket.emit('tweet-io:recent', true);

        this.socket.on('tweet-io:recent',  (data) => {
            console.log(data);
            this.scope.tweets = data;
        });
    }

    parseTwitterDate(twitterDate) {
        let system_date = new Date(Date.parse(twitterDate));
        let user_date = new Date();

        let diff = Math.floor((user_date - system_date) / 1000);
        if (diff <= 1) {return "just now";}
        if (diff < 20) {return diff + " seconds ago";}
        if (diff < 40) {return "half a minute ago";}
        if (diff < 60) {return "less than a minute ago";}
        if (diff <= 90) {return "one minute ago";}
        if (diff <= 3540) {return Math.round(diff / 60) + " minutes ago";}
        if (diff <= 5400) {return "1 hour ago";}
        if (diff <= 86400) {return Math.round(diff / 3600) + " hours ago";}
        if (diff <= 129600) {return "1 day ago";}
        if (diff < 604800) {return Math.round(diff / 86400) + " days ago";}
        if (diff <= 777600) {return "1 week ago";}
        return "on " + system_date;
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
