"use strict";

export default class TwitterButton {
    constructor() {
        this.template = '<a ng-href="https://twitter.com/{{twitterUser}}" class="twitter-follow-button" data-show-count="false" data-show-screen-name="false" data-dnt="true">Follow @{{twitterUser}}</a>';
        this.restrict = 'E';
        this.scope = {
        }
    }

    link(scope, element,attrs) {
        scope.twitterUser = attrs.user;
        (!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs"));
    }
}


