import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';
import {FETCH_PHOTOS} from '../../graphql/queries';


function PhotoIndex() {
  const {loading, error, data } = useQuery(FETCH_PHOTOS);

  if (loading){
    return <div>Loading...</div>
  }
  if (error){
    console.log(error);
    return <div>Error!</div>
  }

  let photos;
  photos = data.photos.map(photo => {
    if(photo.isPublic){
      return (
      <li key={photo.id}>
          <Link to={`/users/${photo.photographer._id}`}>
            {photo.photographer.firstname} {photo.photographer.lastName}
            </Link> 
          <Link to={`/photos/${photo._id}`}>{photo.imageURL}</Link>
          {photo.title}
          {photo.views}
      </li>
      )
    }
  })
  return (
    {photos}
  )
};

export default PhotoIndex;