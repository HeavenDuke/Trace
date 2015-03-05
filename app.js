/**
 * Created by HeavenDuke on 2015/3/5.
 */

var restify = require('restify');
var config = require('./config');
var controllers = require('./controllers');

var server = restify.createServer({
    name: config.server.name
});

server.use(restify.queryParser({
    mapParams: false
}));
server.use(restify.gzipResponse());
server.use(restify.bodyParser({
    maxBodySize: 0,
    mapParams: false,
    mapFiles: false
}));

server.get('/hello', controllers.user.friends.test);

server.listen(config.server.port,config.server.url, function() {
   console.log('%s listening at %s ', server.name, server.url);
});