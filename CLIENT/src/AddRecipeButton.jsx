
import React from 'react';

const AddRecipeButton = ({ isAuthenticated, onClick }) => {
  return (
    <div className="add-recipe-button">
      {isAuthenticated && (
        <button onClick={onClick}>Add Recipe</button>
      )}
      {!isAuthenticated && (
        <p>Please sign in or sign up to add a recipe.</p>
      )}
    </div>
  );
};

export default AddRecipeButton;
