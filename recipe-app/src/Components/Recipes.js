import React, { useContext } from 'react';

import { RecipesContext } from '../contexts/RecipesContext';

import RecipeCard from '../Components/RecipeCard';

const Recipes = () => {
  return (
    <div className='recipes'>
      <RecipeCard />
    </div>
  );
};

export default Recipes;
