require("js-yaml")

var application_root = __dirname,
    path = require('path'),
    Db = require('mysql-activerecord'),
    express = require('express'),
    md5 = require('MD5');

var config = require("../config/config.yml");

var app = express();

exports.express =  app;

exports.listen =  function(){
  app.listen(config.server.port);
  console.log('Listening on port ' + config.server.port + '...');
}

exports.path = function(version, path){
  var rootPath = config.api.default_path;
  var path = rootPath + version + '/' + path;
  return  path;
}

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

exports.config = function(){
  app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(allowCrossDomain);
    app.use(express.static(path.join(application_root, "public")));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.logger(':method :url - :referrer'));
  });
}

exports.jsonFormat = function(err){
  var format = {}
  if (err) {
    format = { status: 'error' };
  } else {
    format = { status: 'success' };
  }

  return format;
}

exports.db =  new Db.Adapter({
                server: config.database.server,
                username: config.database.username,
                password: config.database.password,
                database: config.database.name
              });

exports.md5 = function(text){
  return md5(text);
}

exports.stringSegurity = '%----Talk-it----%';

exports.getDateTime = function() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;
  var day  = date.getDate();
  day = (day < 10 ? "0" : "") + day;
  return year + "-" + month + "-" + day ;
}