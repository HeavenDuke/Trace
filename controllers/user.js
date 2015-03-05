/**
 * Created by HeavenDuke on 2015/3/5.
 */

exports.friends= require('./user.friends');

exports.login = function(req, res, next) {
    console.log(233);
    res.json({
        code: 0,
        message: 'success'
    });
};

exports.register = function(req, res, next) {
    res.json({
        code: 0,
        message: 'success register'
    });
};

exports.info = function(req, res, next) {

};

exports.update = function(req, res, next) {

};