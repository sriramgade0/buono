import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { vegRecipes } from './vegRecipes';
import { paneerRecipes } from './paneerRecipes';
import { chickenRecipes } from './chickenRecipes';
import { muttonRecipes } from './mutton';
import { biryanis } from './Biryanis';
import { nonVegBiryaniRecipes } from './nonVegBiryanis';
import { seeFoodRecipes } from './seeFood';
import logo from './buono.jpeg';
import { images } from './img';

import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import AddRecipeForm from './AddRecipeForm'; // Import the AddRecipeForm component

const allRecipes = {
  veg: vegRecipes,
  paneer: paneerRecipes,
  biryanis: biryanis,
  mutton: muttonRecipes,
  chicken: chickenRecipes,
  seafood: seeFoodRecipes,
  nonVegBiryanis: nonVegBiryaniRecipes,
  nonveg: [...muttonRecipes, ...chickenRecipes, ...seeFoodRecipes, ...nonVegBiryaniRecipes] // Combined non-veg recipes
};

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [signedIn, setSignedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const [signedUp, setSignedUp] = useState(localStorage.getItem('signedUp') === 'true');
  const [filteredRecipes, setFilteredRecipes] = useState([...vegRecipes, ...paneerRecipes, ...biryanis, ...allRecipes.nonveg]); // Default to veg and non-veg recipes
  const [searchTerm, setSearchTerm] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false); // New state for sign-in form
  const [showAddRecipe, setShowAddRecipe] = useState(false); // State to control Add Recipe form
  const [newRecipeAdded, setNewRecipeAdded] = useState(false); // State to track new recipe addition

  const handleSignIn = () => {
    setSignedIn(true);
    localStorage.setItem('loggedIn', 'true'); // Store logged-in status in local storage
  };

  const handleSignUp = () => {
    setSignedUp(true);
    setSignedIn(true);
    localStorage.setItem('loggedIn', 'true'); // Store logged-in status in local storage
    localStorage.setItem('signedUp', 'true'); // Store signed-up status in local storage
  };

  const handleSignOut = () => {
    setSignedIn(false);
    setSignedUp(false);
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('signedUp'); // Remove logged-in and signed-up status from local storage
  };

  const handleRecipeSelect = (recipe) => setSelectedRecipe(recipe);
  const handleBackToRecipes = () => setSelectedRecipe(null);
  const handleFilter = (type) => setFilteredRecipes(allRecipes[type]);
  const handleSearch = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = [...vegRecipes, ...paneerRecipes, ...biryanis, ...allRecipes.nonveg].filter(recipe =>
      recipe.title.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredRecipes(filtered);
  };

  const handleSignUpClick = () => setShowSignUp(true);
  const handleBackToMainFromSignUp = () => setShowSignUp(false);
  const handleSignInClick = () => setShowSignIn(true); // Show sign-in form
  const handleBackToMainFromSignIn = () => setShowSignIn(false); // Hide sign-in form and show main content
  const handleAddRecipeClick = () => setShowAddRecipe(true); // Show Add Recipe form
  const handleBackToMainFromAddRecipe = () => setShowAddRecipe(false); // Hide Add Recipe form and show main content

  const handleAddRecipe = (newRecipe) => {
    setFilteredRecipes([...filteredRecipes, newRecipe]);
    setNewRecipeAdded(true);
    setShowAddRecipe(false);
  };

  useEffect(() => {
    if (newRecipeAdded) {
      const timer = setTimeout(() => {
        setNewRecipeAdded(false);
      }, 5000); // Hide the marquee after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [newRecipeAdded]);

  return (
    <div className="App">
      <header className="App-header">
        {newRecipeAdded && (
          <div className="marquee-container">
            <div className="marquee-text">SCROLL DOWN FOR NEWLY ADDED RECIPE!</div>
          </div>
        )}
        <div className="logo">
          <img src={logo} className="App-logo-small" alt="Logo" />
          <span>Buono</span>
        </div>
        <div className="buttons">
          {!signedIn && !showSignUp && !showSignIn && (
            <>
              <button onClick={handleSignInClick}>Sign In</button>
              <button onClick={handleSignUpClick}>Sign Up</button>
            </>
          )}
          
          {(signedIn || signedUp) && !showSignUp && !showSignIn && !showAddRecipe && (
            <>
              <button onClick={handleSignOut}>Sign Out</button>
              <button onClick={handleAddRecipeClick}>Add Recipe</button>
            </>
          )}
          
          {!showSignUp && !showSignIn && !showAddRecipe && (
            <>
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </>
          )}
        </div>
      </header>
      <main className="content">
        {showSignUp ? (
          <SignUpForm handleBackToMain={handleBackToMainFromSignUp} handleSignUp={handleSignUp} />
        ) : showSignIn ? (
          <SignInForm handleBackToMain={handleBackToMainFromSignIn} handleSignIn={handleSignIn} />
        ) : showAddRecipe ? (
          <AddRecipeForm handleAddRecipe={handleAddRecipe} handleBackToMain={handleBackToMainFromAddRecipe} />
        ) : selectedRecipe ? (
          <div className="recipe-details">
            <button onClick={handleBackToRecipes}>Back to Recipes</button>
            <h1>{selectedRecipe.title}</h1>
            <img src={images[selectedRecipe.title]} alt={selectedRecipe.title} />
            <div>
              <h3>Ingredients:</h3>
              <ul>
                {Array.isArray(selectedRecipe.ingredients) ? (
                  selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))
                ) : (
                  <li>{selectedRecipe.ingredients}</li>
                )}
              </ul>
              <h3>Instructions:</h3>
              <ul>
                {Array.isArray(selectedRecipe.instructions) ? (
                  selectedRecipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))
                ) : (
                  <li>{selectedRecipe.instructions}</li>
                )}
              </ul>
              <p>Time: {selectedRecipe.time || '50 minutes'}</p>
            </div>
          </div>
        ) : (
          <>
            <h1>Buono Finder</h1>
            <div className="filter-buttons">
              <button onClick={() => handleFilter('paneer')} style={{ backgroundColor: 'transparent' }}>Paneer</button>
              <button onClick={() => handleFilter('veg')} style={{ backgroundColor: 'transparent' }}>Veg</button>
              <button onClick={() => handleFilter('biryanis')} style={{ backgroundColor: 'transparent' }}>Veg-Biryanis</button>
              <button onClick={() => handleFilter('mutton')} style={{ backgroundColor: 'transparent' }}>Mutton</button>
              <button onClick={() => handleFilter('chicken')} style={{ backgroundColor: 'transparent' }}>Chicken</button>
              <button onClick={() => handleFilter('seafood')} style={{ backgroundColor: 'transparent' }}>Seafood</button>
              <button onClick={() => handleFilter('nonVegBiryanis')} style={{ backgroundColor: 'transparent' }}>Non-Veg Biryanis</button>
            </div>
            <div className="recipes-container">
              {filteredRecipes.map((recipe, index) => (
                <div
                  className="recipe-item"
                  key={index}
                  onClick={() => handleRecipeSelect(recipe)}
                >
                  <img src={images[recipe.title]} alt={recipe.title} />
                  <p><b>{recipe.title}</b></p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;