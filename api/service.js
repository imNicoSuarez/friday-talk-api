// Requires
var api = require('./lib/api'),
    routes = require('./config/routes');

// Configurations & initializers
var app = api.express;
var db = api.db;
api.config();

version = 'v1';

// Controllers
var UsersController = require('./controllers/users');
var TalksController = require('./controllers/talks');
var SpeakersController = require('./controllers/speakers');
var AuthController = require('./controllers/auth');

// Users
UsersController('', api, db, function(con){
  app.get(api.path(version, routes.users), con.all);
  app.get(api.path(version, routes.user), con.find);
  app.post(api.path(version, routes.users), con.create);
  app.put(api.path(version, routes.user), con.update);
  app.delete(api.path(version, routes.user), con.delete);
});

// Talks
TalksController('', api, db, function(con){
  app.get(api.path(version, routes.talks), con.all);
  app.get(api.path(version, routes.talk), con.find);
  app.post(api.path(version, routes.talks), con.create);
  app.put(api.path(version, routes.talk), con.update);
  app.delete(api.path(version, routes.talk), con.delete);
});

// Speakers
SpeakersController('', api, db, function(con){
  app.get(api.path(version, routes.speakers), con.all);
  app.get(api.path(version, routes.speaker), con.find);
  app.post(api.path(version, routes.speakers), con.create);
  app.put(api.path(version, routes.speaker), con.update);
  app.delete(api.path(version, routes.speaker), con.delete);
});

AuthController('', api, db, function(con){
  app.post(api.path(version, routes.auth), con.login);
});


api.listen();