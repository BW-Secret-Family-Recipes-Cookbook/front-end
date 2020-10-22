import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as yup from 'yup';

import updateSchema from '../validation/updateRecSchema';
import { axiosWithAuth } from '../utils/axiosWithAuth';


const initialRecipe = {
  name: '',
  source: '',
  instructions: '',
  category: '',
  ingredients: [],
};

const initialErrors = {
  name: '',
  source: '',
  instructions: '',
  category: '',
  ingredients: [],
};

const UpdateRecipe = (props) => {
  console.log({ recipe: props.recipe });
  const [recipe, setRecipe] = useState(props.recipe);
  const [errorMessages, setErrorMessages] = useState(initialErrors);
  const { id } = useParams();
  const { push } = useHistory();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    yup.reach(updateSchema, name)
    .validate(value)
    .then(() => {
      setErrorMessages({
        ...errorMessages,
        [name]:'',
      })
    })
    .catch( err => {
      setErrorMessages({
        ...errorMessages,
        [name]: err.errors[0],
      })
    })

    setRecipe({
      ...recipe,
      [name]: value,
    });
  };

  // useEffect(() => {
  //   axiosWithAuth()
  //     .get(`/recipes/${recipe.recipeid}`)
  //     .then((res) => {
  //       setRecipe(res.data);
  //     })
  //     .catch((err) => {
  //       console.log('Error:', err);
  //     });
  // }, [id]);

  useEffect(() => {
    console.log({ recipe });
  }, [recipe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArr = [];
    recipe.ingredients.replace(/,+$/,"").split(',').forEach((ingr) => {
      newArr.push(ingr);
    });
    const updatedRecipe = {
      ...recipe,
      ingredients: newArr,
    };
    axiosWithAuth()
      .put(`/recipes/${recipe.recipeid}`, updatedRecipe)
      .then((res) => {
        setRecipe(res.data);
        push('/recipes/all');
      })
      .catch((err) => {
        console.log('Put Error:', err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button>Submit Changes</button>
      <p>{errorMessages.name}</p>
      <p>{errorMessages.instructions}</p>
      <p>{errorMessages.category}</p>
      <p>{errorMessages.ingredients}</p>
    </form>
  );
};

export default UpdateRecipe;
