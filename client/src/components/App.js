import React from 'react';
import { Route, Switch } from "react-router-dom";
import Login from './session/Login';
import SignUp from './session/SignUp';


const App = () => {
  return (
    <div>
      <h1>Whiskr</h1>
      <Switch>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={SignUp}/>
      </Switch>
    </div>
  );
};

export default App;
