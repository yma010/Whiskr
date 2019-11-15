import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_PHOTOS } from '../../graphql/queries';

import ExplorePhotoIndexItem from "./ExplorePhotoIndexItem";
import "./photoindex.css";
import "./explorePhotoIndex.css";

const ExplorePhotoIndex = () => {
  const [rowWidth, setRowWidth] = useState(0.8 * window.innerWidth);
  const [photoRowsAndHeights, setPhotoRowsAndHeights] = useState([]);

  const { loading, error, data } = useQuery(FETCH_PHOTOS, {
    variables: { limit: 25, offset: 0 }
  });

  const maxRowHeight = 300;
  const gutterSize = 4;

  window.onresize = () => {
    if (window.innerWidth !== rowWidth) {
      const newWidth = 0.8 * window.innerWidth;
      setPhotoRowsAndHeights(photoRowsAndHeights.map(rowAndHeight => {
        const photos = rowAndHeight[0];
        const totalGutterWidth = (photos.length - 1) * gutterSize;
        const oldHeight = rowAndHeight[1];
        const newHeight = oldHeight * (newWidth - totalGutterWidth) / (rowWidth - totalGutterWidth);
        return [photos, newHeight];
      }));
      setRowWidth(newWidth);
    }
  };

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
    while (photos.length > 1) {
      newRow = photos.splice(0, 2);
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