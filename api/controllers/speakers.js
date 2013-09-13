var Speaker = require('../models/speaker');

module.exports = function(auth, service, adapter, callback){
  db = adapter;
  api = service;
  that = this;

  that.all = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    speaker = new Speaker(db, api);
    speaker.getSpeakers(function(err, results){
      data = api.jsonFormat(err);

      if (!err) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        data.speakers = results;
      } else {
        res.writeHead(409, {'Content-Type': 'application/json'});
        data.error = 'RemoteError';
      }

      body = JSON.stringify(data);
      res.end(body);
    });
  }

  that.find = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    speaker = new Speaker(db, api);
    speaker.getSpeaker(req.params.id, function(err, results){
      data = {}

      if (!err) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        data.speakers = results;
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
    speaker = new Speaker(db, api);
    speaker.createSpeaker(req.body, function(err, results){
      data = {}

      if (!err) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        data.speaker = results[0];
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
    speaker = new Speaker(db, api);
    speaker.updateSpeaker(req.params.id, req.body, function(err, results){
      data = {}

      if (!err) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        data.speaker = results[0];
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
    speaker = new Speaker(db, api);
    speaker.deleteSpeaker(req.params.id, function(err){
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