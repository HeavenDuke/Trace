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


//router for user module
server.post('/user/login', controllers.user.login);
server.post('/user/register', controllers.user.register);
server.post('/user/info', controllers.user.info);
server.post('/user/update', controllers.user.update);

//router for user.friends module
server.post('/friends/list', controllers.user.friends.list);
server.post('/friends/add', controllers.user.friends.add);
server.post('/friends/delete', controllers.user.friends.delete);
server.post('/friends/detail', controllers.user.friends.detail);

//router for team module
server.post('/team/showlist', controllers.team.showlist);
server.post('/team/create', controllers.team.create);
server.post('/team/exit', controllers.team.exit);
server.post('/team/remove', controllers.team.remove);
server.post('/team/invite', controllers.team.invite);
server.post('/team/accept', controllers.team.accept);
server.post('/team/reject', controllers.team.reject);
server.post('/team/rjoin', controllers.team.join_rand);
server.post('/team/sjoin', controllers.team.join_selected);

//router for team.play module
server.post('/play/status', controllers.team.play.team_status);
server.post('/play/ai', controllers.team.play.update_ai);
server.post('/play/update', controllers.team.play.update_status);

//router for rank module
server.post('/rank/score', controllers.rank.score);
server.post('/rank/round', controllers.rank.round);
server.post('/rank/mileage', controllers.rank.mileage);

//router for shop module
server.post('/shop/list', controllers.shop.list_shop);
server.post('/shop/buy', controllers.shop.buy);
server.post('/shop/own', controllers.shop.list_own);

server.listen(config.server.port,config.server.url, function() {
   console.log('%s listening at %s ', server.name, server.url);
});