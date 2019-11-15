import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { debounce } from 'lodash';

import { FETCH_PHOTOS } from '../../graphql/queries';
import ExplorePhotoIndexItem from "./ExplorePhotoIndexItem";
import "./photoindex.css";
import "./explorePhotoIndex.css";

const ExplorePhotoIndex = () => {
  const [rowWidth, setRowWidth] = useState(0.8 * window.innerWidth);

  const photoBatch = 40;
  const { loading, error, data, fetchMore } = useQuery(FETCH_PHOTOS, {
    variables: { limit: photoBatch, offset: 0 }
  });

  const maxRowHeight = 300;
  const gutterSize = 4;

  useEffect(() => {
    window.onresize = () => {
      if (window.innerWidth !== rowWidth) {
        const newWidth = 0.8 * window.innerWidth;
        setRowWidth(newWidth);
      }
    };

    return () => window.onresize = null;
  });

  useEffect(() => {
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

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    console.log(error);
    return <div>Error!</div>
  }

  const standardizedHeight = (photos, targetWidth) => {
    const widthsAtUnitHeight = photos.map(photo => photo.width / photo.height);
    const rowWidthAtUnitHeight = widthsAtUnitHeight.reduce((total, width) => total + width, 0);
    return (targetWidth - gutterSize * (photos.length - 1)) / rowWidthAtUnitHeight;
  };

  const constructRowsAndRowHeights = cachedPhotos => {
    const photos = cachedPhotos.slice();
    const rowsAndRowHeights = [];
    let newRow;
    let rowHeight;
    while (photos.length > 0) {
      newRow = photos.splice(0, 1);
      rowHeight = standardizedHeight(newRow, rowWidth);
      while (rowHeight > maxRowHeight && photos.length > 0) {
        newRow = newRow.concat(photos.splice(0, 1));
        rowHeight = standardizedHeight(newRow, rowWidth);
      }

      if (rowHeight < maxRowHeight) {
        rowsAndRowHeights.push([newRow, rowHeight]);
      }
    }

    if (newRow && newRow.length > 0 && rowHeight > maxRowHeight) {
      rowsAndRowHeights.push([newRow, maxRowHeight]);
    }

    return rowsAndRowHeights;
  }

  return (
    <div className="explore-container">
      <ul className="explore-rows">
      <h3>Explore</h3>
      {constructRowsAndRowHeights(data.photos).map((rowAndHeight, idx) => (
        <ul className="explore-single-row" key={idx}>
        {rowAndHeight[0].map(photo => (
          <ExplorePhotoIndexItem key={photo._id} photo={photo} height={rowAndHeight[1]} />
        ))}
        </ul>
      ))}
      </ul>
    </div>
  );
};

export default ExplorePhotoIndex;