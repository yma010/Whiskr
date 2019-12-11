import React from 'react';
import './splash.css';

import image1 from "../../public/splash_images/standing_kitten.jpeg";

const Splash = () => (
  <div className="splash-container">
    <img className="splash-image" src={image1} />
  </div>
);

export default Splash;