import React from 'react';
import { Route, Switch } from "react-router-dom";

import HeaderNav from './HeaderNav';
import Login from './session/Login';
import SignUp from './session/SignUp';

import "../stylesheets/reset.css";


const App = () => {
  return (
    <div>
      <HeaderNav />
      <Switch>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={SignUp}/>
      </Switch>
    </div>
  );
};

export default App;
