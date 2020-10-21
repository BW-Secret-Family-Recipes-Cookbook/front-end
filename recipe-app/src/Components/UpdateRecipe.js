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
};
