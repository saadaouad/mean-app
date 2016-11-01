'use strict';

var restful = require('node-restful');

module.exports = function(app, route){
  var rest = restful.model(
    'movie',
    app.models.movie
  ).methods(['get', 'put', 'post', 'delete', 'patch']);
  // Register this endpoint with the app
  rest.register(app, route);
  // Return middleware
  return function(req, res, next){
    next();
  };
};
