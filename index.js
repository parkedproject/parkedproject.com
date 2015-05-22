var express = require('express');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var r = require('rethinkdb');
var endex = require('endex');

module.exports = function appctor(cfg) {
  var conn;

  r.connect(cfg.rethinkdb).then(function (connection) {
    conn = connection;
    return endex.db('parkedproject')
      .run(conn);
  });

  function requireLogin(req, res, next) {
    if (req.session.username) return next();
    else return res.redirect('/');
  }

  var app = express();
  app.use(serveStatic(__dirname + '/static'));
  app.use(session({
    store: new RedisStore({
      host: cfg.redis.hostname,
      port: cfg.redis.port}),
    secret: cfg.env.SECRET_KEY_BASE,
    resave: false,
    saveUninitialized: false
  }));
  app.use(function (req, res, next) {
    if (!req.session) {
      return next(new Error("couldn't find sessions"));
    }
    else return next();
  });
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get('/', function (req, res) {
    res.render('parking.jade',{
      title: req.hostname,
      headline: 'Coming soon'
    });
  });

  return app;
};
