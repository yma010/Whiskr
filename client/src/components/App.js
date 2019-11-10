import React from 'react';
import { Route, Switch } from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';


const App = () => {
  return (
    <div>
      <h1>Whiskr</h1>
       
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={SignUp}/>
    </div>
  );
};

export default App;
