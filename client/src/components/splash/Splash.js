import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { CURRENT_USER } from '../../graphql/queries';
import './splash.css';

import image0 from "../../public/splash_images/orange_tabby.jpeg";
import image1 from "../../public/splash_images/standing_kitten.jpeg";
import image2 from "../../public/splash_images/sleepy_kitten.jpeg";
import image3 from "../../public/splash_images/kitten_friends.jpeg";
import image4 from "../../public/splash_images/cat_in_grass.jpeg";

const photos = {
  0: {
    image: image0,
    title: "Sleepy Tabby",
    photographer: "Michael Sum",
    handle: "@michaelsum1228"
  },
  1: {
    image: image1,
    title: "Standing Gray Cat",
    photographer: "Marko Blažević",
    handle: "@kerber"
  },
  2: {
    image: image2,
    title: "Snoozing Kitten",
    photographer: "Kate Stone Matheson",
    handle: "@kstonematheson"
  },
  3: {
    image: image3,
    title: "Kitten Friends",
    photographer: "Nathalie Jolie",
    handle: "@visucy"
  },
  4: {
    image: image4,
    title: "Cat in the Grass",
    photographer: "Raquel Pedrotti",
    handle: "@raquelpedrotti"
  }
};

const Splash = () => {

  const [photoIdx, setPhotoIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setPhotoIdx((photoIdx + 1) % Object.keys(photos).length);
    }, 5000);
    return () => clearInterval(interval);
  });

  const { loading, error, data } = useQuery(CURRENT_USER);

  let { currentUser } = data;

  if (loading) {
    return <div>Loading...</div>
  } else if (currentUser) {
    return <Redirect to="/featured-photos" />;
  }

  if (error) {
    console.log(error);
    return <div>Error!</div>
  }

  const photo = photos[photoIdx];

  return (
    <div className="splash-container">
      <figure className="splash-image" 
        style={{ 
          backgroundImage: `url(${photo.image})` }}
      >
      </figure>
      <div className="splash-text">
        <h1>Find your kittenspiration.</h1>
        <h3>Join the Whiskr community, where cat lovers come together to share their favorite feline photos.</h3>
        <Link to="/signup">Start for free</Link>
      </div>
      <div className="splash-attribution">
        <p>{photo.title}</p>
        <p>by {photo.photographer}</p>
        <p>{photo.handle}</p>
      </div>
    </div>
  );
};

export default Splash;