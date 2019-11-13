import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_PHOTO_COMMENTS } from '../../graphql/queries';
import './comments.css'
import CreateComment from './CreateComment';

function PhotoComments (props) {
  const { loading, error, data } = useQuery(FETCH_PHOTO_COMMENTS,
     { variables: { _id: props.match.params.id }});

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    console.log(error);
    return <div>Error!</div>
  }
  
  let { comments } = data.photo;
 
  if (comments.length === 0){
    return (
      <div id='comments'>
        <p>No comments to show</p>
      </div>
    )
  } else {
    let photoComments;
    photoComments = comments.map( (comment, i) => {
      return (
        <div key={i} className="comment-card">
          <li key={comment._id}>
            <div className='comment-author-identity'>
              <Link to={`/users/${comment.author._id}`}>
                {comment.author.firstName} {comment.author.lastName}
              </Link> 
            </div>
            <div className='comment-body'>
              <p>{comment.body}</p>
            </div>
          </li>
        </div>
      )
    })
    return (
      <div id="comments">
        <ul>
          {photoComments}
          <CreateComment photoId={data.photo._id} />
        </ul>
      </div>
    )
  } 
};

export default PhotoComments;