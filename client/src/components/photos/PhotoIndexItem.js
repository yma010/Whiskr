import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const PhotoIndexItem = ({ photo }) => {
  const img = useRef(null);
  const viewHeight = window.innerHeight;
  const viewWidth = window.innerWidth;

  const [isDisplayed, setIsDisplayed] = useState(false);

  return (
    <li className="single-card">
      <div className={isDisplayed ? "photo-lightbox" : "photo-lightbox-hidden"}>
        <button 
          className="close-photo-lightbox"
          onClick={() => setIsDisplayed(false)}
        />
        {isDisplayed ? (<Link 
          to={`/photos/${photo._id}`} title={photo.description}
          className="photo-lightbox-image"
          style={{ 
            backgroundImage: `url(${photo.imageURL})`,
            height: img.current.offsetHeight / 480 * .85 * viewWidth > 0.85 * viewHeight ? "85vh" : `${img.current.offsetHeight / 480 * .85 * viewWidth}px`,
            width: img.current.offsetHeight / 480 * .85 * viewWidth > 0.85 * viewHeight ? `${480 / img.current.offsetHeight * .85 * viewHeight}px` : "85vw"
          }}
        />) : ""}
      </div>
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
      <button className="card-photo" title={photo.description} onClick={() => setIsDisplayed(true)}>
        <img src={photo.imageURL} alt={photo.description} ref={img}></img>
      </button>
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

export default PhotoIndexItem;