import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';

function App() {
  return (
    <div className='App'>
      <Header/>
      <Switch>
        {/* <Route path='/register' component={Register} /> */}
        {/* <Route path='/login' component={Login} /> */}
        {/* <PrivateRoute path='/recipes/all' component={} /> */}
      </Switch>
    </div>
  );
}

export default App;
