import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import PrivateRoute from './components/PrivateRoute';
import { FeedContext } from './contexts/FeedContext';
import { axiosWithAuth } from './utils/axiosWithAuth';

import Login from './components/Header';
import Register from './components/Register';
import Header from './components/Header';

function App() {
  return (
    <div className='App'>
      <Router>
        <FeedContext.Provider>
          <Header />
          <Switch>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            {/* <PrivateRoute path='/recipes/all' component={} /> */}
          </Switch>
        </FeedContext.Provider>
      </Router>
    </div>
  );
}

export default App;
