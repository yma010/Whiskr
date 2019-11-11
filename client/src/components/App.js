import React from 'react';
import { Route, Switch } from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';
import Upload from './Upload';


const App = () => {
  return (
    <div>
      <h1>Whiskr</h1>
      <Switch>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={SignUp}/>
        <Route exact path='/upload' component={Upload}/>>
      </Switch>
    </div>
  );
};

export default App;
