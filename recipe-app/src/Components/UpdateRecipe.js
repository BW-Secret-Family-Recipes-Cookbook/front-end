import React, { useState, useEffect, useContext } from 'react';
import * as yup from 'yup';
import styled from 'styled-components';

import updateSchema from '../validation/updateRecSchema';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import { RecipesContext } from '../contexts/RecipesContext';

const StyledForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  label {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  input {
    margin-left: 2rem;
  }
  button {
    margin: 1rem 0;
    color: white;
    background: #49bf9d;
    margin-top: 25px;
    border: none;
    border-radius: 0.25rem;
    padding: 0.4rem;
    outline: none;
    :hover {
      background: #50d4ae;
      transition: background-color 0.2s ease-in-out;
    }
    :disabled {
      pointer-events: none;
      background-color: #525252;
    }
  }
`;

const StyledErrors = styled.p`
  color: red;
  font-weight: bold;
  margin: 0;
  font-size: 0.9rem;
`;

const initialErrors = {
  name: '',
  source: '',
  instructions: '',
  category: '',
  ingredients: [],
};

const UpdateRecipe = (props) => {
  const { recipes, setRecipes } = useContext(RecipesContext);
  const [recipe, setRecipe] = useState(props.recipe);
  const [errorMessages, setErrorMessages] = useState(initialErrors);
  const [disabled, setDisabled] = useState(true);

  const checkForTrailing = (string) => {
    let stringArray = [];
    let newString = '';
    if (typeof string === 'object') {
      newString = string.toString();
    } else {
      newString = string;
    }
    if (newString.charAt(newString.length - 1) === ',') {
      stringArray = newString.replace(/,+$/, '').split(',');
    } else {
      stringArray = newString.split(',');
    }
    return stringArray;
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    yup
      .reach(updateSchema, name)
      .validate(value)
      .then(() => {
        setErrorMessages({
          ...errorMessages,
          [name]: '',
        });
      })
      .catch((err) => {
        setErrorMessages({
          ...errorMessages,
          [name]: `- ${err.errors[0]}`,
        });
      });

    setRecipe({
      ...recipe,
      [name]: value,
    });
  };

  useEffect(() => {}, [recipe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArr = [];

    checkForTrailing(recipe.ingredients).forEach((ingr) => {
      newArr.push(ingr);
    });

    const updatedRecipe = {
      ...recipe,
      ingredients: newArr,
    };
    console.log(updatedRecipe);
    axiosWithAuth()
      .put(`/recipes/${recipe.recipeid}`, updatedRecipe)
      .then((res) => {
        console.log(res.data);
        setRecipes(
          recipes.map((recipe) => {
            if (updatedRecipe.recipeid === recipe.recipeid) {
              return updatedRecipe;
            } else {
              return recipe;
            }
          })
        );
        props.setEditable('');
      })
      .catch((err) => {
        console.log('Put Error:', err);
      });
  };

  useEffect(() => {
    updateSchema.isValid(recipe).then((valid) => {
      setDisabled(!valid);
    });
  }, [recipe]);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Recipe Editor</h2>

      <label>
        Name:
        <input
          name='name'
          type='text'
          value={recipe?.name}
          onChange={changeHandler}
          placeholder='Enter Recipe Name'
        />
      </label>
      <br />
      <label>
        Source:
        <input
          name='source'
          type='text'
          value={recipe?.source}
          onChange={changeHandler}
          placeholder='Enter Source'
        />
      </label>
      <br />
      <label>
        Instructions:
        <input
          name='instructions'
          type='text'
          value={recipe?.instructions}
          onChange={changeHandler}
          placeholder='Enter Instructions'
        />
      </label>
      <br />
      <label>
        Category:
        <input
          name='category'
          type='text'
          value={recipe?.category}
          onChange={changeHandler}
          placeholder='Enter Category'
        />
      </label>
      {/* ^^^^^should change to selector??? */}
      <br />
      <label>
        Ingredients:
        <input
          name='ingredients'
          type='text'
          value={recipe?.ingredients}
          onChange={changeHandler}
          placeholder='Enter Ingredient'
        />
      </label>
      <div>
        <button disabled={disabled}>Submit Changes</button>
      </div>
      <StyledErrors>{errorMessages.name}</StyledErrors>
      <StyledErrors>{errorMessages.instructions}</StyledErrors>
      <StyledErrors>{errorMessages.category}</StyledErrors>
      <StyledErrors>{errorMessages.ingredients}</StyledErrors>
    </StyledForm>
  );
};

export default UpdateRecipe;
