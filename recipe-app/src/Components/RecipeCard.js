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
  max-width: 300px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  :hover {
    border: solid 7px #49bf9d;
    transition: border-color 0.2s ease-in-out;
  }
  h3 {
    font-size: 1.5rem;
    margin: 0;
  }
  h5 {
    margin: .8rem 0;
  }
  .btn {
    color: #525252;
    font-size: .9rem;
    padding: .3rem .4rem;
    margin: .25rem 0;
    border: none;
    border-radius: 4px;
    background: rgb(239, 239, 239);
    white-space: nowrap;
    outline: none;
    :hover {
      background: #49bf9d;
      color: white;
      transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    }
  }
  .delete-button {
    margin-top: 0;
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
        setRecipes(
          recipes.filter((rec) => {
            if (recipe.recipeid === rec.recipeid) {
              return false;
            } else {
              return true;
            }
          })
        );
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
                  <UpdateRecipe recipe={recipe} editHandler={editHandler} />
                </>
              )}

              <button
                className='delete-button btn'
                onClick={() => {
                  deleteHandler(recipe);
                }}
              >
                Delete Recipe
              </button>
              <button className='edit-button btn' onClick={editHandler}>
                {editable ? 'Cancel' : 'Edit Recipe'}
              </button>
            </StyledCard>
          ))}
    </CardContainer>
  );
};

export default RecipeCard;
