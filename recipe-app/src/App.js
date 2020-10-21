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

// const dummyValues = [{
//   name: 'Rfsdfsafadas f sasdfsdafe1',
//   source: 'Ressa ffasdf ds fs fsad1',
//   instructions: 'Redsafsafs afas dsaf assdfsadfdsafsdf1',
//   category: 'Redsfsafsdfs1',
//   ingredients: ['rock', 'scissors', 'paper'],
// }, {
//   name: 'Re2',
//   source: 'Redsafsdsafdsad fsfasfsafsdafsafsad2',
//   instructions: 'Reas dfsa 2',
//   category: 'Reasdf as2',
//   ingredients: ['rock', 'scissors', 'paper', 'scissors', 'paper', 'scissors', 'paper', 'scissors', 'paper', 'scissors', 'paper', 'paper', 'scissors', 'paper', 'scissors', 'paper', 'scissors', 'paper', 'paper', 'scissors', 'paper', 'scissors', 'paper', 'scissors', 'paper'],
// }, {
//   name: 'Re3',
//   source: 'Rsadfsafesa fdsasa fdsa dsa fsfsadfdsda fsafasfdsafsafd3',
//   instructions: 'Rsafsafe3',
//   category: 'Rsafsafase3',
//   ingredients: ['rock', 'scissors', 'paper'],
// }]

function App() {
  const [recipeValues, setRecipeValues] = useState(initialRecipeValues);
  const [recipes, setRecipes] = useState([]);

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
              <PrivateRoute>
                {/* will add new private route for delete?  */}
                {/* will add new private route for delete?  */}
              </PrivateRoute>
            </Switch>
          </Router>
        </RVContext.Provider>
      </RecipesContext.Provider>
    </div>
  );
}

export default App;
