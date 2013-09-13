cs = require('cansecurity');

var Sync = require('sync');
var Application = require('../models/application');
var User = require('../models/user');

module.exports = function(db, api){
  that = this;

  that.authetication = function(req, res, resultCallback)){
    token = req.get('login_token');

    console.log(token);
    encripted = api.md5( token + api.stringSegurity);

    user = new User();

    Sync(function(){
      user = user.getUserByEncripted.sync(encripted);

    });
  }

  that.applicationAutorize = function(req, res, next){
    var appToken = req.get('app_token');
    application = new Application();
    res.setHeader('Access-Control-Allow-Origin', '*');

    data = api.jsonFormat(false);

    Sync(function(){
      applicationResult = application.getApplicationForToken.sync(appToken);

      if (applicationResult.length > 0) {
        next();
      } else {
        res.writeHead(401, {'Content-Type': 'application/json'});
        data.error = 'UnauthorizedError';
      }
    });
  }

  that.autorization = function(){
    application = new Application(db, api);
  }

}