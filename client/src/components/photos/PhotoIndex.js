import React from 'react';
import {Link} from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';
import {FETCH_PHOTOS} from '../../graphql/queries';
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

  let photos;
  photos = data.photos.map(photo => {
    return (
      <div className="single-card" key={photo._id}>
        <li key={photo._id}>
        <div className="card-identity">
          <img className="user-avatar" src={photo.imageURL} alt="avatar"/>
          <Link to={`/users/${photo.photographer._id}`}> 
            {photo.photographer.firstName} {photo.photographer.lastName} 
          </Link> 
        </div>        
        <div className="card-photo">
          <Link to={`/photos/${photo._id}`} title={photo.description}> 
            <img src={photo.imageURL} alt={photo.description}></img> 
          </Link>
        </div>
        <div className="card-info">
          <div className="photo-title">
              <p>{photo.title}</p>
          </div>
          <div className="photo-actions">
            <div className="activity-card-counts">
              <span className="view-count">{photo.views} Views</span> 
            </div>
          </div>
        </div> 
        </li> 
      </div>
    );
  });

  return (
    <div className="feed-container">
      <div className="feed">
        <ul>
          {photos}
        </ul>
      </div>
    </div>
  )
};

export default PhotoIndex;