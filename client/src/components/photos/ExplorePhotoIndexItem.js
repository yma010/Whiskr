import React, { useState } from "react";
import { Link } from "react-router-dom";

const ExplorePhotoIndexItem = ({ photo, height }) => {
  const [isInfoDisplayed, setInfoDisplayed] = useState(false);

  const cardIdentity = (
    <div className="card-identity">
      <Link
        className="user-avatar"
        to={`/users/${photo.photographer._id}/photos`}
        style={{ backgroundImage: `url(${photo.photographer.avatarURL || '../../public/camera-avatar.png'})` }}
      />
      <div>
        <Link to={`/users/${photo.photographer._id}/photos`}>
          {photo.photographer.firstName} {photo.photographer.lastName}
        </Link>
        <span>Featured</span>
      </div>
    </div>
  );

  const cardInfo = (
    <div className="card-info">
      <div className="photo-title-description">
        <p>{photo.title}</p>
        <p>{photo.description}</p>
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
  );

  return (
    <li
      className = "explore-single-photo"
      style = {{
        backgroundImage: `url(${photo.imageURL})`,
        height,
        width: photo.width * height / photo.height
      }}
      onMouseEnter={() => setInfoDisplayed(true)}
      onMouseLeave={() => setInfoDisplayed(false)}
    >
      <div className={isInfoDisplayed ? "photo-lightbox-info" : "photo-lightbox-info hidden"}>
        <Link to={`/photo/${photo._id}/album`} title={photo.description} className="photo-lightbox-link" />
        {cardIdentity}
        {cardInfo}
      </div>
    </li >
  );
};

export default ExplorePhotoIndexItem;