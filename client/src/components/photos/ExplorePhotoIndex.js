import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_PHOTOS } from '../../graphql/queries';

import "./explorePhotoIndex.css";

const ExplorePhotoIndex = () => {
  const { loading, error, data } = useQuery(FETCH_PHOTOS);

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    console.log(error);
    return <div>Error!</div>
  }

  const rowWidth = 0.8 * window.innerWidth;
  const maxRowHeight = 300;
  const gutterSize = 4;

  const standardizedHeight = (photos, targetWidth) => {
    const widthsAtUnitHeight = photos.map(photo => photo.width / photo.height);
    const rowWidthAtUnitHeight = widthsAtUnitHeight.reduce((total, width) => total + width, 0);
    return (targetWidth - gutterSize * (photos.length - 1)) / rowWidthAtUnitHeight;
  };

  const constructRowsAndRowHeights = photos => {
    const rowsAndRowHeights = [];

    while (photos.length > 1) {
      let newRow = photos.splice(0, 2);
      let rowHeight = standardizedHeight(newRow, rowWidth);
      while (rowHeight > maxRowHeight && photos.length > 0) {
        newRow = newRow.concat(photos.splice(0, 1));
        rowHeight = standardizedHeight(newRow, rowWidth);
      }

      if (rowHeight < maxRowHeight) {
        rowsAndRowHeights.push([newRow, rowHeight]);
      }
    }

    return rowsAndRowHeights;
  }

  return (
    <div className="explore-container">
      <ul className="explore-rows">
      {constructRowsAndRowHeights(data.photos).map((rowAndHeight, idx) => (
        <ul className="explore-single-row" key={idx}>
        {rowAndHeight[0].map(photo => {
          const height = rowAndHeight[1];
          return (
            <li
              className="explore-single-photo"
              key={photo._id}
              style={{
                backgroundImage: `url(${photo.imageURL})`,
                height,
                width: photo.width * height / photo.height
              }}
            >
            </li>
          );
        })}
        </ul>
      ))}
      </ul>
    </div>
  );
};

export default ExplorePhotoIndex;