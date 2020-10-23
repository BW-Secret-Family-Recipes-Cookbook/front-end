import React, { useContext, useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import { RecipesContext } from '../contexts/RecipesContext';

import styled from 'styled-components';

import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Recipe name is required.'),
  source: yup.string().required('Source is required.'),
  ingredients: yup.string().required('Ingredients are required.'),
  category: yup.string().required('Category is required.'),
  instructions: yup.string().required('Instructions are required.'),
});

const SRAddCard = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    border: solid 7px #efefef;
    border-radius: 1.3rem;
    margin: 10px;
  }

  .container:hover {
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

  .errors {
    color: red;
  }
`;

const AddRecipe = (props) => {
  const { recipes, setRecipes } = useContext(RecipesContext);

  const [isDisabled, setIsDisabled] = useState(true);

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: '' }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  const [recipe, setRecipe] = useState({
    name: '',
    source: '',
    instructions: '',
    category: '',
    ingredients: [],
  });
  const [errors, setErrors] = useState({
    name: '',
    source: '',
    instructions: '',
    category: '',
    ingredients: [],
  });

  const onCancel = (evt) => {
    evt.preventDefault();
    setRecipe({
      name: '',
      source: '',
      instructions: '',
      category: '',
      ingredients: [],
    });
  };

  const changeHandler = (evt) => {
    const { name, value } = evt.target;
    setFormErrors(name, value);
    setRecipe({
      ...recipe,
      [name]: value,
    });
  };

  //Splits the ingredients by ',' character and pushes each of them
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

  useEffect(() => {
    schema.isValid(recipe).then((valid) => setIsDisabled(!valid));
  }, [recipe]);

  const onSubmit = (e) => {
    e.preventDefault();
    const newArr = [];
    //Splits the ingredients by ',' character and pushes each of them
    recipe.ingredients
      .replace(/,+$/, '')
      .split(',')
      .forEach((ingr) => {
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
        console.log(res.data);
        setRecipes([...recipes, res.data]);
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
    });
  };

  return (
    <SRAddCard onSubmit={onSubmit}>
      <div className='container'>
        <h2>Add New Recipe</h2>
        <div className='errors'>
          <div>{errors.name}</div>
          <div>{errors.source}</div>
          <div>{errors.instructions}</div>
          <div>{errors.category}</div>
          <div>{errors.ingredients}</div>
        </div>
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

        <select
          name='category'
          placeholder='Select Category'
          value={recipe.category}
          onChange={changeHandler}
        >
          <option value=''>--Select Category--</option>
          <option value='Breakfast'>Breakfast</option>
          <option value='Brunch'>Brunch</option>
          <option value='Lunch'>Lunch</option>
          <option value='Dinner'>Dinner</option>
          <option value='Drinks'>Drinks</option>
          <option value='Dessert'>Dessert</option>
        </select>

        {/* <input
        name='category'
        type='text'
        value={recipe.category}
        onChange={changeHandler}
        placeholder='Enter Category'
      /> */}
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
