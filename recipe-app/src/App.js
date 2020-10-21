import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import PrivateRoute from './Components/PrivateRoute';

import { RecipesContext } from './contexts/RecipesContext';
import { RVContext } from './contexts/RVcontext';

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

const dummyValues = [{
  name: 'Re1',
  source: 'Re1',
  instructions: 'Re1',
  category: 'Re1',
  ingredients: ['rock', 'scissors', 'paper'],
}, {
  name: 'Re2',
  source: 'Re2',
  instructions: 'Re2',
  category: 'Re2',
  ingredients: ['rock', 'scissors', 'paper'],
}, {
  name: 'Re3',
  source: 'Re3',
  instructions: 'Re3',
  category: 'Re3',
  ingredients: ['rock', 'scissors', 'paper'],
}]

function App() {
  const [recipeValues, setRecipeValues] = useState(initialRecipeValues);
  const [recipes, setRecipes] = useState(dummyValues);

  return (
    <div className='App'>
      <RecipesContext.Provider value={{ recipes, setRecipes }}>
        <RVContext.Provider value={{ recipeValues, setRecipeValues }}>
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
        </RVContext.Provider>
      </RecipesContext.Provider>
    </div>
  );
}

export default App;
