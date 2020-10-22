import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import { RecipesContext } from '../contexts/RecipesContext';
import { RVContext } from '../contexts/RVcontext';
import styled from 'styled-components';

const SRAddCard = styled.form`
  display: flex;
  flex-direction: column;
  width:100%;
  align-items:center;


  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    border: solid 7px #efefef;
    border-radius: 1.3rem;
    margin: 10px;
  }

  .container:hover{
    border: solid 7px #49bf9d;
    transition: border-color 0.2s ease-in-out;
  }

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
    margin-bottom: 15px;
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
  const [recipe, setRecipe] = useState({
    name: '',
    source: '',
    instructions: '',
    category: '',
    ingredients: [],
  });

  const { push } = useHistory();

  const onCancel = (evt) => {
    evt.preventDefault();
    reset();
  };

  const changeHandler = (evt) => {
    const { name, value } = evt.target;
    setRecipe({
      ...recipe,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newArr = [];
    //Splits the ingredients by ',' character and pushes each of them
    recipe.ingredients.replace(/,+$/,"").split(',').forEach((ingr) => {
      newArr.push(ingr);
    });
    const newRecipe = {
      ...recipe,
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

      setRecipe({
        name: '',
        source: '',
        instructions: '',
        category: '',
        ingredients: [],
      })
  };

  const isDisabled = () => {
    return !values.text.trim() || !values.recipes.trim();
  };

  return (
    <SRAddCard onSubmit={onSubmit}>
      <div className='container'>
      <h2>Add New Recipe</h2>

      <input
        name='name'
        type='text'
        value={recipe.name}
        onChange={changeHandler}
        placeholder='Enter Recipe Name'
      />

      <input
        name='source'
        type='text'
        value={recipe.source}
        onChange={changeHandler}
        placeholder='Enter Source'
      />

      <input
        name='instructions'
        type='text'
        value={recipe.instructions}
        onChange={changeHandler}
        placeholder='Enter Instructions'
      />

      <input
        name='category'
        type='text'
        value={recipe.category}
        onChange={changeHandler}
        placeholder='Enter Category'
      />
      {/* ^^^^^should change to selector??? */}

      <input
        name='ingredients'
        type='text'
        value={recipe.ingredients}
        onChange={changeHandler}
        placeholder='Enter Ingredient'
      />

      <button className='submitBtn' disabled={isDisabled}>
        Submit
      </button>
      <button className='cancelBtn' onClick={onCancel}>
        Cancel
      </button>
      </div>
    </SRAddCard>
  );
};

export default AddRecipe;
