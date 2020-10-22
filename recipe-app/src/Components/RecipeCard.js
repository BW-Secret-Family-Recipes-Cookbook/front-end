import React, { useState, useEffect, useContext } from 'react';
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
  min-width: 250px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  :hover {
    border: solid 7px #49bf9d;
    transition: border-color 0.2s ease-in-out;
  }
  div {
    width: 100%;
  }
  h3 {
    font-size: 1.5rem;
    margin: 0 auto;
  }
  h5 {
    margin: 0.8rem;
    font-weight: 500;
    text-align: left;
    p {
      margin: 0;
      font-weight: 700;
    }
  }
  h5:nth-of-type(1) {
    margin: 0.8rem auto 0.2rem auto;
    text-align: center;
  }
  .btn {
    color: #525252;
    font-size: 0.9rem;
    padding: 0.3rem 0.4rem;
    margin: 0.25rem 0 0 0;
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
    margin-top: 1rem;
  }
`;

const RecipeCard = (props) => {
  const { recipes, setRecipes } = useContext(RecipesContext);
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
      });
  };

  useEffect(() => {
    getRecipes();
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

  const editHandler = (e) => {
    console.log(e.target);
    setEditable(e.target.name);
  };

  return (
    <CardContainer className='user-recipes'>
      {props.isLoading
        ? renderLoader()
        : recipes.map((recipe, idx) => (
            <StyledCard key={idx} className='current-recipes'>
              {recipe.recipeid != editable ? (
                <div>
                  <h3>{`${recipe.name}`}</h3>
                  <h5><p>Recipe Source:</p>{`${recipe.source}`}</h5>
                  <h5><p>Instructions:</p>{`${recipe.instructions}`}</h5>
                  <h5><p>Category:</p>{`${recipe.category}`}</h5>
                  <h5><p>Ingredients:</p>{`${recipe.ingredients.join(', ')}`}</h5>
                </div>
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
              <button
                name={recipe.recipeid != editable ? recipe.recipeid : ''}
                className='edit-button btn'
                onClick={editHandler}
              >
                {recipe.recipeid == editable ? 'Cancel' : 'Edit Recipe'}
              </button>
            </StyledCard>
          ))}
    </CardContainer>
  );
};

export default RecipeCard;
