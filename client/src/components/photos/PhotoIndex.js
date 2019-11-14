import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {FETCH_PHOTOS} from '../../graphql/queries';
import PhotoIndexItem from "./PhotoIndexItem";
import './photoindex.css'

function PhotoIndex() {
  const {loading, error, data } = useQuery(FETCH_PHOTOS);

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
      leftColumnPhotos.push(<PhotoIndexItem photo={photo} key={photo._id} />)
      : rightColumnPhotos.push(<PhotoIndexItem photo={photo} key={photo._id} />);
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