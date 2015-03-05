/**
 * Created by HeavenDuke on 2015/3/5.
 */

exports.play= require('./team.play');

exports.showlist = function(req, res, next) {
    console.log(2333);
    res.json({
        code: 0,
        message: 'success'
    });
};

exports.create = function(req, res, next) {

};

exports.remove = function(req, res, next) {

};

exports.exit = function(req, res, next) {

};

exports.join_rand = function(req, res, next) {

};

exports.join_selected = function(req, res, next) {

};

exports.invite = function(req, res, next) {

};

exports.accept = function(req, res, next) {

};

exports.reject = function(req, res, next) {

};