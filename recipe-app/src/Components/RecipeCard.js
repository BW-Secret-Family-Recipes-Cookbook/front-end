import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

import { RecipesContext } from '../contexts/RecipesContext';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import UpdateRecipe from './UpdateRecipe';

// import AddRecipe from './AddRecipe';
const CardContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;
const StyledCard = styled.div`
  color: #525252;
  border: solid 7px #efefef;
  margin: 2rem;
  padding: 2rem;
  border-radius: 1.3rem;
  max-width: 290px;
  :hover {
    border: solid 7px #49bf9d;
    transition: border-color 0.2s ease-in-out;
  }
  h3 {
    font-size: 1.5rem;
  }
  h5 {
  }
`;

const RecipeCard = (props) => {
  const { recipes, setRecipes } = useContext(RecipesContext);

  const { id } = useParams();
  const { push } = useHistory();

  // TODO Remove State Handler for Editing / Disabled state
  const [editable, setEditable] = useState(false);

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

  const deleteHandler = (recipe) => {
    console.log(recipe);
    axiosWithAuth()
      .delete(`/recipes/${recipe.recipeid}`)
      .then(() => {
        push('/recipes/all');
      })
      .catch((err) => {
        console.log('Delete Error:', err);
      });
  };

  const editHandler = () => {
    setEditable(!editable);
  };

  return (
    <CardContainer className='user-recipes'>
      <div>{/* <AddRecipe /> */}</div>
      {props.isLoading
        ? renderLoader()
        : recipes.map((recipe, idx) => (
            <StyledCard key={idx} className='current-recipes'>
              {!editable ? (
                <>
                  <h3>{`Recipe Name: ${recipe.name}`}</h3>
                  <h5>{`Recipe Source: ${recipe.source}`}</h5>
                  <h5>{`Instructions: ${recipe.instructions}`}</h5>
                  <h5>{`Category: ${recipe.category}`}</h5>
                  <h5>{`Ingredients: ${recipe.ingredients.join(', ')}`}</h5>
                </>
              ) : (
                <>
                  <UpdateRecipe recipe={recipe} />
                </>
              )}

              <div
                className='delete-button'
                onClick={() => {
                  deleteHandler(recipe);
                }}
              >
                Delete Recipe
              </div>
              <div className='edit-button' onClick={editHandler}>
                {editable ? 'Cancel' : 'Edit Recipe'}
              </div>
            </StyledCard>
          ))}
    </CardContainer>
  );
};

export default RecipeCard;
