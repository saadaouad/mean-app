'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

// Create the app
var app = express();

// Add middleware necessary for REST API
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-method-Override'));

// CORS support
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost/meanapp');
mongoose.connection.once('open', function(){
  mongoose.Promise = global.Promise;
  // Load the models
  app.models = require('./models/index');
  // Load the routes
  var routes = require('./routes');
  _.each(routes, function(controller, route){
    app.use(route, controller(app, route));
  });
  // Run app
  console.log('Listening on port 3000...');
  app.listen(3000);
});
