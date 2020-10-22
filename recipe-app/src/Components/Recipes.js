import React from 'react';

import RecipeCard from '../Components/RecipeCard';
import AddRecipe from '../Components/AddRecipe';

const Recipes = (props) => {
  return (
    <div className='recipes'>
      <AddRecipe />
      <RecipeCard />
    </div>
  );
};

export default Recipes;
