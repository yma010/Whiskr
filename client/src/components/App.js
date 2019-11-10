import React from 'react';
import { Route, Switch } from "react-router-dom";

import "../stylesheets/reset.css";

import HeaderNav from './HeaderNav';
import Login from './Login';
import SignUp from './SignUp';


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
