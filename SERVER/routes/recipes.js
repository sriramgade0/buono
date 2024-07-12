const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe'); // Assuming Recipe model is defined

// POST /api/recipes - Add a new recipe
router.post('/', async (req, res) => {
  try {
    const { title, ingredients, instructions, time } = req.body;
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      time,
      // Add more fields as needed
    });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error adding recipe:', error);
    res.status(500).json({ message: 'Failed to add recipe' });
  }
});

module.exports = router;
