import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery} from "@apollo/react-hooks";
import { FETCH_ALBUM_FROM_PHOTO} from '../../graphql/queries';
import ('./albums.css');

function AlbumShow(props){
  const [activeIndex, setIndex] = useState(0);
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
   if (activeIndex >= albums.length){
     setIndex(0)
    } else if (activeIndex < 0){
      setIndex(albums.length-1);
   }
  console.log(album)
  const entryIdx = album.photos.indexOf(props.photoId);
  console.log(entryIdx)
  let slides = album.photos.map((photo, index) => {
    let style;
     style={ display: (index === activeIndex) ?  "block" : "none" }
    return (
    <li key={photo.id}>
      <img src={photo.imageURL} alt={photo.description} style={style} ></img>
    </li>)
});

    let styleP;
    styleP = { display: activeIndex < 0 ? "none" : "block" };
    let styleN;
    styleN = { display: activeIndex > album.photos.lenght-1 ? "none" : "block" };

    return (
      <div>

      <div className="top-carousel">
        
        <button
          className=""
          onClick={e => setIndex(activeIndex -1)}
        style={styleP}>
          prev
        </button>
        {slides}
       
        <button
          className="" 
          onClick={e => setIndex(activeIndex +1)}
          style={styleN}>
          next
        </button>
      </div>
      </div>
    );

};

export default AlbumShow;