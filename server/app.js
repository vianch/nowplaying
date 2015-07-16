<<<<<<< HEAD
var config = require('./config/config');
var express = require('express');
var morgan = require('morgan');
var app = express();
var server = app.listen(config.port, function () {
    console.log( "Server created by Victor Chavarro: ");
    console.log( "ROOT PATH: "+config.root);
    console.log('NowPlaying simple one-page application available at http://127.0.0.1:' + config.port);
});
var io = require('socket.io').listen(server);
exports.io = io;


app.use(morgan('dev'));
app.use(express.static(config.root));
require('./config/routes').init(app);

var twitter = require('./config/twitter');



=======
var config = require('./config/config');
var express = require('express');
var morgan = require('morgan');
var app = express();
var server = app.listen(config.port, function () {
    console.log( "Server created by Victor Chavarro: ");
    console.log( "ROOT PATH: "+config.root);
    console.log('NowPlaying simple one-page application available at http://127.0.0.1:' + config.port);
});
var io = require('socket.io').listen(server);
exports.io = io;


app.use(morgan('dev'));
app.use(express.static(config.root));
require('./config/routes').init(app);

var twitter = require('./config/twitter');



>>>>>>> origin/master
