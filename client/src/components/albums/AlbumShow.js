import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FETCH_ALBUM_FROM_PHOTO} from '../../graphql/queries';


function AlbumShow(props){
  // const { data } = useQuery(FETCH_ALBUM_FROM_PHOTO, {
  //   variables: { _id: props.match.params.id }
  // });

  // console.log('--->');  
  // console.log(data);
  
  // const album = data.photo.albums.length - 1;
  // // const entryIdx = album.photos.indexOf(props.photoId);
  // const [activeIndex, setIndex] = useState(0);
  
  // let prevButton;
  // let nextButton;
  // if (activeIndex === 0) {
  //   prevButton =  <div></div>
  //   nextButton = <button className="carousel__arrow carousel__arrow--right" onClick={e => setIndex(+1)}>
  //                 next
  //                </button>
  // } else if (activeIndex === album.photos.length -1){
  // prevButton =  <button className="carousel__arrow carousel__arrow--left" onClick={e => setIndex(-1)}>
  //                   prev
  //                 </button>;
  //   nextButton = <div></div>
  // } else {
  //     prevButton =  <button className="carousel__arrow carousel__arrow--left" 
  //      onClick={e => setIndex(-1)}>
  //                   prev
  //                 </button>;
  //   nextButton = <button className="carousel__arrow carousel__arrow--right" 
  //      onClick={e => setIndex(+1)}>
  //                 next
  //                </button>
  // }

  // let slides = album.photos.map(photo => (
  //   <li
  //     key={photo.id}
  //     // className={
  //     //   index == activeIndex ? 
  //     //   style="display: block" : style="display: none"
  //     // }
  //   >
  //     {/* <img src={photo.imageURL} alt={photo.description} ref={img}></img> */}
  //   </li>
  // ));
    // return (
    //   <div>
    //    {prevButton}
    //     {slides}
    //    {nextButton}
    //   </div>
    // );

    return (
      <div>hi</div>
    )
};

export default AlbumShow;