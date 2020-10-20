import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import PrivateRoute from './Components/PrivateRoute';
import { axiosWithAuth } from './utils/axiosWithAuth';

import { LoginContext } from './contexts/LoginContext';
import { RegisterContext } from './contexts/RegisterContext';
import { RecipesContext } from './contexts/RecipesContext';

import Login from './Components/Login';
import Register from './Components/Register';
import Recipes from './Components/Recipes';
import Header from './Components/Header';

function App() {
  return (
    <div className='App'>
      <LoginContext.Provider>
        <RegisterContext.Provider>
          <RecipesContext.Provider>
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
        </RegisterContext.Provider>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
