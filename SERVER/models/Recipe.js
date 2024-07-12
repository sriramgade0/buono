// models/Recipe.js

const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  time: {
    type: String, // You can adjust the type as per your requirement (e.g., Number, String)
  },
  // Add more fields as needed
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
