import React, { useState, useEffect } from 'react';
import {useQuery} from '@apollo/react-hooks';
import {FETCH_PHOTOS} from '../../graphql/queries';
import PhotoIndexItem from "./PhotoIndexItem";
import './photoindex.css'

function PhotoIndex() {
  const [noScroll, setNoScroll] = useState(false);
  const obj = useQuery(FETCH_PHOTOS, {
    fetchPolicy: "no-cache"
  });
  useEffect(() => {
    if (noScroll) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  });
  const {loading, error, data } = obj;
  console.log(`index:`);
  console.log(obj);

  if (loading){
    return <div>Loading...</div>
  }
  if (error){
    console.log(error);
    return <div>Error!</div>
  }
  
  const leftColumnPhotos = [], rightColumnPhotos = [];
  
  data.photos.forEach((photo, idx) => {
    idx % 2 === 0 ? 
      leftColumnPhotos.push(<PhotoIndexItem photo={photo} key={photo._id} setNoScroll={setNoScroll} />)
      : rightColumnPhotos.push(<PhotoIndexItem photo={photo} key={photo._id} setNoScroll={setNoScroll} />);
  });

  return (
    <div className="feed-container">
      <div className="feed">
        <ul>
          {leftColumnPhotos}
        </ul>
        <ul>
          {rightColumnPhotos}
        </ul>
      </div>
    </div>
  )
};

export default PhotoIndex;