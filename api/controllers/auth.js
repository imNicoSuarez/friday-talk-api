var User = require('../models/user');
module.exports = function(auth, service, adapter, callback){
  db = adapter;
  api = service;
  that = this;

  that.login = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    user = new User(db, api);
    user.getUserByAuth(req.params.email, req.params.password, function(err, results){
      data = {};

      if (!err) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        data.users = results;
      } else {
        res.writeHead(409, {'Content-Type': 'application/json'});
        data.error = 'LoginError';
      }

      body = JSON.stringify(data);
      res.end(body);
    });
  }
}