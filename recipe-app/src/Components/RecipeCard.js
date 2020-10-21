import React, { useState, useEffect, useContext } from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components'

import { RecipesContext } from '../contexts/RecipesContext';
import { axiosWithAuth } from '../utils/axiosWithAuth';

// import AddRecipe from './AddRecipe';

const StyledCard = styled.div`

`

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
        // debugger
        // let newData = [{
        //   name: 'Re4',
        //   source: 'Re4',
        //   instructions: 'Re4',
        //   category: 'Re4',
        //   ingredients: ['rock', 'scissors', 'paper'],
        // }]
        setRecipes([...recipes.concat(res.data)]);
        // console.log(recipes)
        // console.log(res.data);
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
        : recipes &&
          recipes.map((recipe, idx) => (
            <div key={idx} className='current-recipes'>
              <h3>{`Recipe Name: ${recipe.name}`}</h3>
              <h5>{`Recipe Source: ${recipe.source}`}</h5>
              <h5>{`Instructions: ${recipe.instructions}`}</h5>
              <h5>{`Category: ${recipe.category}`}</h5>
              <h5>{`Ingredients: ${recipe.ingredients.toString()}`}</h5>
              {/* <h5>{`Ingredients: ${recipe.ingredients.map((ingredient) => {
                return ingredient.ingredient.name;
              })}`}</h5> */}
            </div>
          ))}
    </div>
  );
};

export default RecipeCard;
