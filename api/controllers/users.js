var User = require('../models/user');

module.exports = function(auth, service, adapter, callback){
  db = adapter;
  api = service;
  that = this;

  that.all = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    user = new User(db, api);
    user.getUsers(function(err, results){
      data = {}

      if (!err) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        data.users = results;
      } else {
        res.writeHead(409, {'Content-Type': 'application/json'});
        data.error = 'RemoteError';
        data.dec = err;
      }

      body = JSON.stringify(data);
      res.end(body);
    });
  }

  that.find = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    user = new User(db, api);
    user.getUser(req.params.id, function(err, results){
      data = {}

      if (!err) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        data.users = results;
      } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        data.error = 'NotFoundError';
      }

      body = JSON.stringify(data);
      res.end(body);
    });
  }

  that.create = function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    user = new User(db, api);
    user.createUser(req.body, function(err, results){
      data = {}

      if (!err) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        data.user = results[0];
      } else {
        res.writeHead(409, {'Content-Type': 'application/json'});
        data.error = 'RemoteError';
        data.dsc = err;
      }

      body = JSON.stringify(data);
      res.end(body);
    });
  }

  that.update = function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    user = new User(db, api);
    user.updateUser(req.params.id, req.body, function(err, results){
      data = {}

      if (!err) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        data.user = results[0];
      } else {
        res.writeHead(409, {'Content-Type': 'application/json'});
        data.error = 'RemoteError';
        data.dsc = err;
      }

      body = JSON.stringify(data);
      res.end(body);
    });
  }

  that.delete = function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    user = new User(db, api);
    user.deleteUser(req.params.id, function(err){
      data = {}

      if (err) {
        res.writeHead(409, {'Content-Type': 'application/json'});
        data.error = 'RemoteError';
        data.dsc = err;
      }

      body = JSON.stringify(data);
      res.end(body);
    });
  }

  callback(that);
}