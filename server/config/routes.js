exports.init = function(app) {
    app.all('*', function(req, res, next) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
        if ('OPTIONS' == req.method) return res.send(200);
        next();
    });
};
