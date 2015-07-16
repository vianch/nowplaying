var Twit = require('twit');
var io = require('../app').io;
var TWEETS_BUFFER_SIZE = 5;

//events
var SOCKETIO_TWEETS_EVENT = 'tweet-io:tweets';
var SOCKETIO_START_EVENT = 'tweet-io:start';
var SOCKETIO_STOP_EVENT = 'tweet-io:stop';
var SOCKETIO_POST_TWEET = 'tweet-io:post';
var SOCKETIO_GET_RECENT_TWEETS = 'tweet-io:recent';

var HASHTAG = '#NowPlaying';
var nbOpenSockets = 0;
var firstConnection = true;
var tweetsBuffer = [];
var oldTweetsBuffer = [];

var twitterApi = new Twit({
    consumer_key:         'gEFEbGdkVTDfzVgyiiCbzUImi',
    consumer_secret:      'Q4yQ000AiJL110zoNEkBYL0ASl84SUcnaxkCJ01uZzeghqWeXX',
    access_token:         '2834545563-3Gp2kIjsN5fFSiph2560NAJanr3WZ6S8pMjzPVU',
    access_token_secret:  'iESkAmBbHXWaCHLrkXN89CUyigMMZ5QHboNYsczUDQLlg'
});

//TODO: location: [4.7100000,-74.0700000] GEOCODE IS NOT WORKING ON TWITTER
var stream = twitterApi.stream('statuses/filter', { track: 'youtube' });

//Handle Socket.IO events
var discardClient = function() {
    console.log('Client disconnected !');
    nbOpenSockets--;

    if (nbOpenSockets <= 0) {
        nbOpenSockets = 0;
        console.log("No active client. Stop streaming from Twitter");
        stream.stop();
    }
};

var handleClient = function(data, socket) {
    if (data) {
        console.log('Client connected !');

        if (nbOpenSockets <= 0) {
            nbOpenSockets = 0;
            console.log('First active client. Start streaming from Twitter');
            stream.start();
        }

        nbOpenSockets++;

        //Send previous tweets buffer to the new client.
        if (oldTweetsBuffer != null && oldTweetsBuffer.length != 0) {
            socket.emit(SOCKETIO_TWEETS_EVENT, oldTweetsBuffer);
        }
    }
};

//socket on events
io.sockets.on('connection', function(socket) {

    socket.on(SOCKETIO_START_EVENT, function(data) {
        handleClient(data, socket);
    });

    socket.on(SOCKETIO_STOP_EVENT, discardClient);

    socket.on(SOCKETIO_POST_TWEET, function(data) {
        if(data) {
            var updateSuccess = true;
            twitterApi.post('statuses/update', { status: data.comment+' '+data.videoUrl+' '+HASHTAG }, function(err, data, response) {
                console.log(data)
                if(err) {
                    updateSuccess = false;
                }
                socket.emit(SOCKETIO_POST_TWEET, updateSuccess);
            });
        }
    });

    socket.on(SOCKETIO_GET_RECENT_TWEETS, function(data) {
        if(data) {
            console.log("finding tweets...");
            //TODO: geocode:'4.6473605,-74.0565511,350km' GEOCODE IS NOT WORKING ON TWITTER
            twitterApi.get('search/tweets', { q: HASHTAG+' youtube', count: TWEETS_BUFFER_SIZE, include_entities:true }, function(err, data, response) {
                if(!err) {
                    socket.emit(SOCKETIO_GET_RECENT_TWEETS, data.statuses);
                }
            })
        }
    });

    socket.on('disconnect', discardClient);
});

//Handle streaming Twitter events
stream.on('connect', function(request) {
    if(firstConnection) {
        console.log('Connected to Twitter API');
        firstConnection = false;
    }
});

stream.on('disconnect', function(message) {
    console.log('Disconnected from Twitter API. Message: ' + message);
});

stream.on('reconnect', function (request, response, connectInterval) {
    console.log('Trying to reconnect to Twitter API in ' + connectInterval + ' ms');
});

stream.on('tweet', function(tweet) {
    if (tweet.place == null) {
        return ;
    }

    //push msg into buffer
    console.log("Loading more tweets...");
    tweetsBuffer.push(tweet);

    broadcastTweets();
});

var broadcastTweets = function() {
    //send buffer only if full
    if (tweetsBuffer.length >= TWEETS_BUFFER_SIZE) {
        //broadcast tweets
        io.sockets.emit(SOCKETIO_TWEETS_EVENT, tweetsBuffer);

        oldTweetsBuffer = tweetsBuffer;
        tweetsBuffer = [];
    }
}