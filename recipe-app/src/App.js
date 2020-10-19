import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import PrivateRoute from './Components/PrivateRoute';
import { FeedContext } from './contexts/FeedContext';
import { axiosWithAuth } from './utils/axiosWithAuth';

import Login from './Components/Login';
import Register from './Components/Register';
import Header from './Components/Header';

function App() {
  return (
    <div className='App'>
      <Router>
        <FeedContext.Provider>
          <Header />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            {/* <PrivateRoute path='/recipes/all' component={} /> */}
          </Switch>
        </FeedContext.Provider>
      </Router>
    </div>
  );
}

export default App;
