import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery} from "@apollo/react-hooks";
import { FETCH_ALBUM_FROM_PHOTO} from '../../graphql/queries';
import PhotoComments from "../comments/PhotoComments";
import ('./albums.css');

function AlbumShow(props){

  const [activeIndex, setIndex] = useState();
  const {loading, error, data} = useQuery(FETCH_ALBUM_FROM_PHOTO, {
    variables: { _id: props.match.params.id }
  });
  
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
    return <div>Error!</div>;
  }
  let {albums } = data.photo;
  let album = albums[albums.length - 1];
  let start = album.photos.findIndex(obj => obj._id === props.match.params.id);
  
  if(activeIndex === undefined){
    setIndex(start);
  }
  //creates a loop on the carousel
  // else if (activeIndex >= album.photos.length){
  //   setIndex(0)
  // } else if (activeIndex < 0){
  //   setIndex(album.photos.length-1);
  // }

  //renders buttons based on the active index

  let slides = album.photos.map((photo, index) => {
      const cardIdentity = (
        <div className="card-identity">
          <Link
            className="user-avatar"
            to={`/users/${photo.photographer._id}`}
            style={{
              backgroundImage: `url(${photo.photographer.avatarURL ||
                "../../public/camera-avatar.png"})`
            }}
          />
          <div>
            <Link to={`/users/${photo.photographer._id}`}>
              {photo.photographer.firstName} {photo.photographer.lastName}
            </Link>
            <span>Featured</span>
          </div>
        </div>
      ); 

    let style;
     style={ display: (index === activeIndex) ?  "block" : "none" }

     let comments;
    if (index === activeIndex) { 
        comments = <PhotoComments photoId={photo._id} comments={photo.comments}/> 
    } else {
        comments = <div style={{display: 'none'}}></div>
    }
      return (
        <div className="image-elements" style={style}>
          <li key={photo.id} style={style}>
            <img
              src={photo.imageURL}
              alt={photo.description}
              style={style}
            ></img>
          </li>
            <div className='card-comments'>
            {cardIdentity}
            {comments}
            </div>
        </div>
      );
    });

    let styleP;
    styleP = { display: activeIndex === 0 ? "none" : "block" };
    let styleN;
    styleN = { display: activeIndex === album.photos.length - 1 ? "none" : "block" };

    return (
      <div className="heigth-controller">
        <div className="carousel-wrap">
            <button
              className="prev-next-button"
              onClick={e => setIndex(activeIndex - 1)}
              style={styleP}
            >
              <span className="prev-icon"></span>
            </button>
          <div className="top-carousel">
            <div className="image-item">
              {slides}
            </div>
          </div>
            <button
              className="prev-next-button"
              onClick={e => setIndex(activeIndex + 1)}
              style={styleN}
            >
              <span className="next-icon"></span>
            </button>
        </div>
      </div>
    );
};

export default AlbumShow;