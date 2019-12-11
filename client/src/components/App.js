import React from 'react';
import { Route, Switch } from "react-router-dom";
import Upload from './upload/Upload';
import HeaderNav from './HeaderNav';
import Login from './session/Login';
import SignUp from './session/SignUp';
import PhotoIndex from './photos/PhotoIndex';
import ExplorePhotoIndex from './photos/ExplorePhotoIndex';
import "../stylesheets/reset.css";
import PhotoComments from './comments/PhotoComments';
import AlbumShow from './albums/AlbumShow';
import Splash from './splash/Splash';

const App = () => {
  return (
    <div>
      <HeaderNav />
      <Switch>
        <Route path='/splash' component={Splash}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={SignUp}/>
        <Route path='/photo/:id/comments' component={PhotoComments}/>
        <Route exact path='/upload' component={Upload}/>
        <Route exact path='/photo/:id/album' component={AlbumShow}/>
        <Route path='/explore/:filter' component={ExplorePhotoIndex}/>
        <Route path='/explore' component={ExplorePhotoIndex}/>
        <Route path='/users/:_id/photos' component={ExplorePhotoIndex}/>
        <Route path='/search' component={ExplorePhotoIndex}/>
        <Route path='/' component={PhotoIndex} />
      </Switch>
    </div>
  );
};

export default App;
