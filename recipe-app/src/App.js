import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return (
    <div className='App'>
      <h1>Recipe-App</h1>
      <Switch>
        {/* <Route path='/register' component={Register} /> */}
        {/* <Route path='/login' component={Login} /> */}
        {/* <PrivateRoute path='/recipes/all' component={} /> */}
      </Switch>
    </div>
  );
}

export default App;
