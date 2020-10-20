import React, { useState, useEffect, useContext } from 'react';
import Loader from 'react-loader-spinner';

import { RecipesContext } from '../contexts/RecipesContext';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const RecipeCard = (props) => {
  const { recipes, setRecipes } = useContext(RecipesContext);
  // const [recipes, setRecipes] = useState([]);

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
        setRecipes(...recipes, res.data);
        console.log(res.data);
      });
  };

  useEffect(() => {
    getRecipes();
    console.log('test');
  }, []);

  return (
    <div>
      <div>
        <p>will put CardSetup here??</p>
      </div>
      {props.isLoading
        ? renderLoader()
        : recipes.map((recipe, idx) => (
            <div key={idx} className='current-recipes'>
              <h3>{`Recipe Name: ${recipe.name}`}</h3>
              <h5>{`Recipe Source: ${recipe.source}`}</h5>
              <h5>{`Instructions: ${recipe.instructions}`}</h5>
              <h5>{`Category: ${recipe.category}`}</h5>
              <h5>{`Ingredients: ${recipe.ingredients.map((ingredient) => {
                return ingredient.ingredient.name;
              })}`}</h5>
            </div>
          ))}
    </div>
  );
};

export default RecipeCard;
