var express = require('express');
var morgan = require('morgan');
var config = require('./config/config');

var app = express();
app.use(morgan('dev'));
app.use(express.static(config.root));
require('./config/routes').init(app);

app.listen(config.port, function () {
    console.log( "Server created by Victor Chavarro: ");
    console.log( "ROOT PATH: "+config.root);
    console.log('NowPlaying simple one-page application available at http://localhost:' + config.port);
});
