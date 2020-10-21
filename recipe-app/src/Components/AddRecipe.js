import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import { RecipesContext } from '../contexts/RecipesContext';
import { RVContext } from '../contexts/RVcontext';
import styled from 'styled-components';

const SRAddCard = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  box-shadow: 0px 0px 2px;
  border-radius: 10px;
  margin: 10px;

  input {
    display: flex;
    width: 70%;
    padding: 4px;
    margin: 4px;
  }

  button {
    padding: 4px;
    width: 30%;
    margin: 4px;
    border: none;
    border-radius: 4px;
  }

  .submitBtn {
    color: white;
    background: #49bf9d;
    margin-top: 25px;
  }

  .submitBtn:hover {
    background: #50d4ae;
  }
  .cancelBtn {
    margin-bottom: 10px;
  }
  .cancelBtn:hover {
    background: #e3e3e3;
  }
`;

const AddRecipe = (props) => {
  //States and variables
  const {
    values,
    setValues,
    reset,
    // submitHandlers: { postIngredient, putIngredient },
  } = props;

  const { recipes, setRecipes } = useContext(RecipesContext);
  const { recipeValues, setRecipeValues } = useContext(RVContext);
  const { push } = useHistory();

  const onCancel = (evt) => {
    evt.preventDefault();
    reset();
  };

  const changeHandler = (evt) => {
    const { name, value } = evt.target;
    setRecipeValues({
      ...recipeValues,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newArr = [];
    newArr.push(recipeValues.ingredients);
    const newRecipe = {
      ...recipeValues,
      ingredients: newArr,
    };
    console.log(newRecipe);
    axiosWithAuth()
      .post('/recipes/new', newRecipe)
      .then((res) => {
        push('/recipes/all');
      })
      .catch((err) => {
        console.log('Post new recipes Error:', err);
      });
  };

  const isDisabled = () => {
    return !values.text.trim() || !values.recipes.trim();
  };

  return (
    <SRAddCard onSubmit={onSubmit}>
      <h2>Recipe Card</h2>

      <input
        name='name'
        type='text'
        value={recipeValues.name}
        onChange={changeHandler}
        placeholder='Enter Recipe Name'
      />

      <input
        name='source'
        type='text'
        value={recipeValues.source}
        onChange={changeHandler}
        placeholder='Enter Source'
      />

      <input
        name='instructions'
        type='text'
        value={recipeValues.instructions}
        onChange={changeHandler}
        placeholder='Enter Instructions'
      />

      <input
        name='category'
        type='text'
        value={recipeValues.category}
        onChange={changeHandler}
        placeholder='Enter Category'
      />
      {/* ^^^^^should change to selector??? */}

      <input
        name='ingredients'
        type='text'
        value={recipeValues.ingredients}
        onChange={changeHandler}
        placeholder='Enter Ingredient'
      />

      <button className='submitBtn' disabled={isDisabled}>
        Submit
      </button>
      <button className='cancelBtn' onClick={onCancel}>
        Cancel
      </button>
    </SRAddCard>
  );
};

export default AddRecipe;
