import React, { useState, useEffect } from 'react';
import {useQuery} from '@apollo/react-hooks';
import { debounce } from 'lodash';

import {FETCH_PHOTOS} from '../../graphql/queries';
import PhotoIndexItem from "./PhotoIndexItem";
import './photoindex.css'

function PhotoIndex() {
  const [noScroll, setNoScroll] = useState(false);

  const photoBatch = 12;
  const { loading, error, data, fetchMore } = useQuery(FETCH_PHOTOS, {
    variables: { limit: photoBatch, offset: 0 }
  });

  useEffect(() => {
    if (noScroll) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  });

  useEffect(function() {
    window.onscroll = debounce(() => {
      if (document.body.clientHeight - window.scrollY < 3000) {
        console.log("refetching");
        window.onscroll = null;
        fetchMore({
          variables: { limit: photoBatch, offset: data.photos.length },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return Object.assign({}, prev, {
              photos: [...prev.photos, ...fetchMoreResult.photos]
            });
          }
        })
      }
    }, 200);

    return () => window.onscroll = null;
  });

  if (loading){
    return <div>Loading...</div>
  }
  if (error){
    console.log(error);
    return <div>Error!</div>
  }
  
  const leftColumnPhotos = [], rightColumnPhotos = [];
  
  data.photos.forEach((photo, idx) => {
    idx % 2 === 0 ? 
      leftColumnPhotos.push(<PhotoIndexItem photo={photo} key={photo._id} setNoScroll={setNoScroll} />)
      : rightColumnPhotos.push(<PhotoIndexItem photo={photo} key={photo._id} setNoScroll={setNoScroll} />);
  });

  return (
    <div className="feed-container">
      <div className="feed">
        <ul>
          {leftColumnPhotos}
        </ul>
        <ul>
          {rightColumnPhotos}
        </ul>
      </div>
    </div>
  )
};

export default PhotoIndex;