import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import PrivateRoute from './Components/PrivateRoute';

import { RecipesContext } from './contexts/RecipesContext';

import Login from './Components/Login';
import Register from './Components/Register';
import Recipes from './Components/Recipes';
import Header from './Components/Header';

const initialRecipeValues = {
  name: '',
  source: '',
  instructions: '',
  category: '',
  ingredients: [],
};

function App() {
  const [recipeValues, setRecipeValues] = useState(initialRecipeValues);
  const [recipes, setRecipes] = useState([]);

  return (
    <div className='App'>
      <RecipesContext.Provider value={{ recipes, setRecipes }}>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/register'>
              <Register />
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <PrivateRoute path='/recipes/all'>
              <Recipes />
            </PrivateRoute>
          </Switch>
        </Router>
      </RecipesContext.Provider>
    </div>
  );
}

export default App;
