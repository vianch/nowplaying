"use strict";

class TwitterVideoListController {
    constructor($scope,socket,$sce) {
        this.scope = $scope;
        this.socket = socket;
        this.sce = $sce;
        this.initializeScopeData();
        this.loadFirstData();
        this.streamTweets();
    }

    initializeScopeData() {
        this.scope.tweets = [];
        this.scope.parseTwitterDate = (twitterDate) => this.parseTwitterDate(twitterDate);
    }

    loadFirstData() {
        this.socket.emit('tweet-io:recent', true);
        this.socket.on('tweet-io:recent',  (data) => {
            this.formatTweets(data);
        });
    }

    streamTweets() {
        this.socket.emit('tweet-io:start', true);
        this.socket.on('tweet-io:tweets',  (data) => {
           this.formatTweets(data);
        });
    }

    formatTweets(data) {
        let youtubeId = null;
        for(let iterator = 0, tweetsLength = data.length; iterator < tweetsLength; iterator++) {
            if(data[iterator].entities && data[iterator].entities.urls[0]) {
                youtubeId = this.youtubeIdParser(data[iterator].entities.urls[0].expanded_url);
                if(youtubeId !== undefined && youtubeId !== null) {
                    data[iterator].entities.urls[0].expanded_url = this.sce.trustAsResourceUrl("https://www.youtube.com/embed/"+youtubeId);
                    data[iterator].entities.showTweet = true;
                } else {
                    data[iterator].entities.showTweet = false;
                }
            }
        }
        this.scope.tweets = this.scope.tweets.concat(data);
    }

     youtubeIdParser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length===11) ? match[7]: null;
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
            "$sce",
            ($scope,socket,$sce) => {
                new TwitterVideoListController($scope,socket,$sce);
            }
        ];
    }
}
