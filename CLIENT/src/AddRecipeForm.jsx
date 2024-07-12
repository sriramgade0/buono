import React, { useState } from 'react';
import './AddRecipeForm.css';

const AddRecipeForm = ({ handleAddRecipe, handleBackToMain }) => {
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    ingredients: '',
    instructions: '',
    time: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddRecipe(formData);
  };

  return (
    <div className="add-recipe-form">
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
      {/* <div className="form-group">
          <label>Image:</label>
          <input
            type="file" 
            accept=".jpg, .jpeg, .png, .gif, .bmp" 
            name="image"
            onChange={handleChange} 
            required
          />
        </div> */}
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Ingredients:</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Instructions:</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Time:</label>
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Recipe</button>
      </form>
      <button onClick={handleBackToMain} className="back-button">
        Back
      </button>
    </div>
  );
};

export default AddRecipeForm;
