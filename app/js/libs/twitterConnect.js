"use strict";

export default class TwitterClient {

    constructor(twitterApi) {
        let config = {
            "consumerKey": "gEFEbGdkVTDfzVgyiiCbzUImi",
            "consumerSecret": "Q4yQ000AiJL110zoNEkBYL0ASl84SUcnaxkCJ01uZzeghqWeXX",
            "accessToken": "2834545563-3Gp2kIjsN5fFSiph2560NAJanr3WZ6S8pMjzPVU",
            "accessTokenSecret": "iESkAmBbHXWaCHLrkXN89CUyigMMZ5QHboNYsczUDQLlg",
            "callBackUrl": "http://127.0.0.1:3000/#/"
        };

        this.twitterApi = new twitterApi.Twitter(config);
    }

    postTweetInNowPlayingAccount(comment) {
        this.twitterApi.getSearch({'q':'#haiku','count': 10},
            (err) => {
                console.log(err);
            },
            (data) => {
                console.log(data);
            });
    }

}