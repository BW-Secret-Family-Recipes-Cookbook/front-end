import React, { useState, useEffect, useContext } from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components'

import { RecipesContext } from '../contexts/RecipesContext';
import { axiosWithAuth } from '../utils/axiosWithAuth';

// import AddRecipe from './AddRecipe';
const CardContainer = styled.div`
display: flex;
flex-flow: row wrap;
justify-content: center;
`
const StyledCard = styled.div`
color: #525252;
border: solid 7px #efefef;
margin: 2rem;
padding: 2rem;
border-radius: 1.3rem;
max-width: 300px;
  :hover {
    border: solid 7px #49bf9d;
    transition: border-color 0.2s ease-in-out;
}
h3 {
  font-size: 1.5rem;
}
h5 {
  
}
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
        setRecipes([...res.data]);
        // console.log(recipes)
        // console.log(res.data);
      });
  };

  useEffect(() => {
    getRecipes();
    console.log('test');
  }, []);

  return (
    <CardContainer className='user-recipes'>
      <div>{/* <AddRecipe /> */}</div>
      {props.isLoading
        ? renderLoader()
        : recipes.map((recipe, idx) => (
            <StyledCard key={idx} className='current-recipes'>
              <h3>{`Recipe Name: ${recipe.name}`}</h3>
              <h5>{`Recipe Source: ${recipe.source}`}</h5>
              <h5>{`Instructions: ${recipe.instructions}`}</h5>
              <h5>{`Category: ${recipe.category}`}</h5>
              <h5>{`Ingredients: ${recipe.ingredients.join(', ')}`}</h5>
            </StyledCard>
          ))}
      {/* <div className='edit-button' onClick={editHandler}>
        Edit Recipe
      </div>
      <div className='delete-button' onClick={deleteHandler}>
        Delete Recipe
      </div> */}
    </CardContainer>
  );
};

export default RecipeCard;
