import React from "react";
import { Link } from "react-router-dom";

const photoIndexItem = ({ photo }) => {
  return (
    <li className="single-card" key={photo._id}>
      <div className="card-identity">
        <Link
          className="user-avatar"
          to={`/users/${photo.photographer._id}`}
          style={{ backgroundImage: `url(${photo.photographer.avatarURL || '../../public/camera-avatar.png'})` }}
        />
        <div>
          <Link to={`/users/${photo.photographer._id}`}>
            {photo.photographer.firstName} {photo.photographer.lastName}
          </Link>
          <span>Featured</span>
        </div>
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
            <span>{photo.comments.length} Comments</span>
          </div>
          <div className="photo-actions-links">
            <i className="photo-actions-comment-icon" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default photoIndexItem;