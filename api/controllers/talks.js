var Talk = require('../models/talk');

module.exports = function(auth, service, adapter, callback){
  db = adapter;
  api = service;
  that = this;

  that.all = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    talk = new Talk(db, api);
    talk.getTalks(function(err, results){
      data = {};

      if (!err) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        data.talks = results;
      } else {
        res.writeHead(409, {'Content-Type': 'application/json'});
        data.error = err;
      }

      body = JSON.stringify(data);
      res.end(body);
    });
  }

  that.find = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    talk = new Talk(db, api);
    talk.getTalk(req.params.id, function(err, results){
      data = {}

      if (!err) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        data.talks = results;
      } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        data.error = err;
      }

      body = JSON.stringify(data);
      res.end(body);
    });
  }

  that.create = function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    talk = new Talk(db, api);
    talk.createTalk(req.body, function(err, results){
      data = {}

      if (!err) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        data.talk = results[0];
      } else {
        res.writeHead(409, {'Content-Type': 'application/json'});
        data.error = err;
      }

      body = JSON.stringify(data);
      res.end(body);
    });
  }

  that.update = function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    talk = new Talk(db, api);
    talk.updateTalk(req.params.id, req.body, function(err, results){
      data = {}

      if (!err) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        data.talk = results[0];
      } else {
        res.writeHead(409, {'Content-Type': 'application/json'});
        data.error = err;
      }

      body = JSON.stringify(data);
      res.end(body);
    });
  }

  that.delete = function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    talk = new Talk(db, api);
    talk.deleteTalk(req.params.id, function(err){
      data = {}

      if (err) {
        res.writeHead(409, {'Content-Type': 'application/json'});
        data.error = err;
      }

      body = JSON.stringify(data);
      res.end(body);
    });
  }

  callback(that);
}