import React, { useContext } from 'react';

// import { RecipesContext } from './contexts/RecipesContext';

import RecipeCard from '../Components/RecipeCard';
import AddRecipe from '../Components/AddRecipe';

const Recipes = () => {
  return (
    <div className='recipes'>
      <AddRecipe />
      <RecipeCard />
    </div>
  );
};

export default Recipes;
