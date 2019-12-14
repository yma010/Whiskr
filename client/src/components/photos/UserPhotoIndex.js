import React from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import ExplorePhotoIndex from './ExplorePhotoIndex';
import { FETCH_USER } from '../../graphql/queries';

import "./userPhotoIndex.css";

const UserPhotoIndex = props => {
  const { loading, error, data } = useQuery(FETCH_USER, {
    variables: { _id: props.match.params._id }
  }); 

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    console.log(error);
    return <div>Error!</div>
  }

  const style = data.user.avatarURL ? 
    { backgroundImage: `url("${data.user.avatarURL}")` } : null;

  return (
    <div className="user-photo-index-container">
      <header className="user-header-container">
        <div className="user-header-overlay">
          <div className="user-header-content">
            <div 
              className="large-user-avatar"
              style={style}
            ></div>
            <div className="user-header-info">
              <h1>{data.user.firstName} {data.user.lastName}</h1>
              <h3>{data.user.email.split("@")[0]}</h3>
            </div>
          </div>
        </div>
      </header>
      <ExplorePhotoIndex />
    </div>
  );
};

export default withRouter(UserPhotoIndex);