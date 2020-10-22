import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';

import * as yup from 'yup'


const schema = yup.object().shape({
  name: yup.string().required('Recipe name is required.'),
  source: yup.string().required('Source is required.'),
  ingredients: yup.string().required('Ingredients are required.'),
  category: yup.string().required('Category is required.'),
  instructions: yup.string().required('Instructions are required.')
})


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

  .errors{
    color:red;
  }

`;

const AddRecipe = (props) => {
  const [isDisabled, setIsDisabled] = useState(true)

  const setFormErrors = (name, value) =>{
    yup.reach(schema, name).validate(value)
      .then(()=>setErrors({...errors, [name]:''}))
      .catch(err=>setErrors({...errors, [name]: err.errors[0]}))
  }

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

  const { push } = useHistory();

  const onCancel = (evt) => {
    evt.preventDefault();
    setRecipe({name: '',
    source: '',
    instructions: '',
    category: '',
    ingredients: [],})
  };

  const changeHandler = (evt) => {
    const { name, value } = evt.target;
    setFormErrors(name, value)
    setRecipe({
      ...recipe,
      [name]: value,
    });
  };

  useEffect(() =>{
    schema.isValid(recipe).then(valid => setIsDisabled(!valid)
    )

    }, [recipe])

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
