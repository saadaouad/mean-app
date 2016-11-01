'use strict';

var mongoose = require('mongoose');
// Create the movie schema
var movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    requiredd: true
  }
});

// Export the model schema
module.exports = movieSchema;
