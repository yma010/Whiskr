import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery} from "@apollo/react-hooks";
import { FETCH_ALBUM_FROM_PHOTO} from '../../graphql/queries';
import { printIntrospectionSchema } from "graphql";
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
    let style;
     style={ display: (index === activeIndex) ?  "block" : "none" }

     let comments;
    if (index === activeIndex) { 
        comments = <PhotoComments photoId={photo._id}/> 
    } else {
        comments = <div></div>
    }

      return (
        <div>
          <li key={photo.id}>
            <img
              src={photo.imageURL}
              alt={photo.description}
              style={style}
            ></img>
            {comments}
          </li>
        </div>
      );
});

    let styleP;
    styleP = { display: activeIndex === 0 ? "none" : "block" };
    let styleN;
    styleN = { display: activeIndex === album.photos.length-1 ? "none" : "block" };

    return (
      <div>
        <div className="top-carousel">
          <button
            className="" onClick={e => setIndex(activeIndex -1)} style={styleP}>
            prev
          </button>

          {slides}
        
          <button
            className="" onClick={e => setIndex(activeIndex +1)} style={styleN}>
            next
          </button>
        </div>
      </div>
    );

};

export default AlbumShow;