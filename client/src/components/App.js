import React from 'react';
import { Route, Switch } from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';
import Navbar from './Navbar';

const App = () => {
  return (
    <div>
      <h1>Whiskr</h1>
        <Route path='/' component={Navbar} />
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={SignUp}/>
    </div>
  );
};

export default App;
