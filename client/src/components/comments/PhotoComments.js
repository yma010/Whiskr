import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_PHOTO_COMMENTS } from '../../graphql/queries';
// import './comments.css'


function PhotoComments () {
  const { loading, error, data } = useQuery(FETCH_PHOTO_COMMENTS, {variables: {
    _id: this.props.match.params.id
  }});

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    console.log(error);
    return <div>Error!</div>
  }

  let { comments } = data.photo.comments;
  if (comments){
    let photoComments;
    photoComments = comments.map( comment => {
      // let date = toDateString(comment.date)
      return (
        <div>
          <li key={comment._id}>
            <Link to={`/users/${comment.author._id}`}>
              {comment.author.firstName} {comment.author.lastName}
            </Link> 
            <p>{comment.body}</p>
          </li>
        </div>
      )
    })
    return (
      <div>
        {photoComments}    
      </div>
    )
  } else {
    return (<div>
      <p>No comments to show</p>
    </div>)
  }
};

export default PhotoComments;