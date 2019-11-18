import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";

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
          <span><Link smooth to={`/photo/${photo._id}/album#comments`}>{photo.comments.length} Comments</Link></span>
          <span className="view-count">{photo.views} Views</span>
        </div>
        <div className="photo-actions-links">
          <Link smooth to={`/photo/${photo._id}/album#new-comment`}>
            <i className="photo-actions-comment-icon" />
          </Link>
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