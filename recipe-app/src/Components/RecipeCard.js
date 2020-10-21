import React, { useState, useEffect, useContext } from 'react';
import Loader from 'react-loader-spinner';

import { RecipesContext } from '../contexts/RecipesContext';
import { axiosWithAuth } from '../utils/axiosWithAuth';

// import AddRecipe from './AddRecipe';

const RecipeCard = (props) => {
  const { recipes, setRecipes } = useContext(RecipesContext);

  const renderLoader = () => {
    return (
      <div>
        <Loader
          type='Puff'
          color='#00BFFF'
          height={15}
          width={115}
          timeout={30000} //3 secs
        />
      </div>
    );
  };

  const getRecipes = () => {
    axiosWithAuth()
      .get('/recipes/all')
      .then((res) => {
        setRecipes(...recipes, res.data);
        console.log(res.data);
      });
  };

  useEffect(() => {
    getRecipes();
    console.log('test');
  }, []);

  return (
    <div className='user-recipes'>
      <div>{/* <AddRecipe /> */}</div>
      {props.isLoading
        ? renderLoader()
        : recipes.map((recipe, idx) => (
            <div key={idx} className='current-recipes'>
              <h3>{`Recipe Name: ${recipe.name}`}</h3>
              <h5>{`Recipe Source: ${recipe.source}`}</h5>
              <h5>{`Instructions: ${recipe.instructions}`}</h5>
              <h5>{`Category: ${recipe.category}`}</h5>
              <h5>{`Ingredients: ${recipe.ingredients.map((ingredient) => {
                return ingredient.name;
              })}`}</h5>
            </div>
          ))}
      <div className='edit-button' onClick={editHandler}>
        Edit Recipe
      </div>
      <div className='delete-button' onClick={deleteHandler}>
        Delete Recipe
      </div>
    </div>
  );
};

export default RecipeCard;
