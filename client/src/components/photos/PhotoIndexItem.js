import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const PhotoIndexItem = ({ photo, setNoScroll }) => {
  const img = useRef(null);
  const viewHeight = window.innerHeight;
  const viewWidth = window.innerWidth;

  const [isDisplayed, setIsDisplayed] = useState(false);
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
          <span>{photo.comments.length} Comments</span>
          <span className="view-count">{photo.views} Views</span>
        </div>
        <div className="photo-actions-links">
          <Link to={`/photo/${photo._id}/comments`}>
            <i className="photo-actions-comment-icon"   />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <li className="single-card">
      <div className={isDisplayed ? "photo-lightbox" : "photo-lightbox hidden"}>
        <button 
          className="close-photo-lightbox"
          onClick={() => { setIsDisplayed(false); setNoScroll(false); }}
        />
        {isDisplayed ? (<div 
          to={`/photos/${photo._id}`} title={photo.description}
          className="photo-lightbox-image"
          style={{ 
            backgroundImage: `url(${photo.imageURL})`,
            height: img.current.offsetHeight / 480 * .85 * viewWidth > 0.85 * viewHeight ? "85vh" : `${img.current.offsetHeight / 480 * .85 * viewWidth}px`,
            width: img.current.offsetHeight / 480 * .85 * viewWidth > 0.85 * viewHeight ? `${480 / img.current.offsetHeight * .85 * viewHeight}px` : "85vw"
          }}
          onMouseEnter={() => setInfoDisplayed(true)}
          onMouseLeave={() => setInfoDisplayed(false)}
        >
          <div className={isInfoDisplayed ? "photo-lightbox-info" : "photo-lightbox-info hidden"}>
            <Link to={`/photo/${photo._id}/album`} title={photo.description} className="photo-lightbox-link"/>
            {cardIdentity}
            {cardInfo}
          </div>
        </div>) : ""}
      </div>
      {cardIdentity}
      <button 
        className="card-photo" 
        title={photo.description} 
        onClick={() => { setIsDisplayed(true); setNoScroll(true); }}
      >
        <img src={photo.imageURL} alt={photo.description} ref={img}></img>
      </button>
      {cardInfo}
    </li>
  );
};

export default PhotoIndexItem;