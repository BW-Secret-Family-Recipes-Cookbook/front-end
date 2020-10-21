import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialRecipe = {
  name: '',
  source: '',
  instructions: '',
  category: '',
  ingredients: [],
};

const UpdateRecipe = () => {
  const [recipe, setRecipe] = useState(initialRecipe);
  const { id } = useParams();
  const { push } = useHistory();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      [name]: value,
    });
  };

  useEffect(() => {
    axiosWithAuth()
      .get(`/recipes${id}`)
      .then((res) => {
        setRecipe(res.data);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`recipes/${recipe.id}`, recipe)
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

      <input
        name='recipe'
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
        placeholder='Enter Recipe Name'
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
        placeholder='Enter Instructions'
      />
      {/* ^^^^^should change to selector??? */}

      <input
        name='ingredient'
        type='text'
        value={recipe.ingredients}
        onChange={changeHandler}
        placeholder='Enter Ingredient'
      />
      <button>Submit Changes</button>
    </form>
  );
};

export default UpdateRecipe;
