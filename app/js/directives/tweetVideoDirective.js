"use strict";

class TweetVideoController {
    constructor($scope) {
        this.scope = $scope;
        this.initializeScope();
    }

    initializeScope() {
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
            ($scope) => {
                new TweetVideoController($scope);
            }
        ];
    }
}
