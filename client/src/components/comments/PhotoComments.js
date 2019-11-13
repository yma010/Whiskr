import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { FETCH_PHOTO_COMMENTS, CURRENT_USER } from '../../graphql/queries';
import './comments.css'
import CreateComment from './CreateComment';
import { DELETE_COMMENT } from '../../graphql/mutations';
// import DeleteComment from './DeleteComment';

function PhotoComments (props) {
  const { loading, error, data } = useQuery(FETCH_PHOTO_COMMENTS,
    { variables: { _id: props.match.params.id }});
    const { data: {currentUser} } = useQuery(CURRENT_USER);
  const [deleteComment] = useMutation(DELETE_COMMENT);
    
    if (loading) {
      return <div>Loading...</div>
    }
    if (error) {
      console.log(error);
      return <div>Error!</div>
    }
    
    console.log(data);
    let { comments } = data.photo;
    if (!comments){
      return (
        <div id='comments'>
        <p>No comments to show</p>
      </div>
    )
  } else {
    let photoComments;
    let deleteButton;
    photoComments = comments.map( (comment, i) => {
     if (currentUser._id === comment.author._id) { 
       deleteButton = 
       <button onClick={(e) => { 
         e.preventDefault(); 
         deleteComment({variables: {_id: comment._id}})}
        }>
          Delete
          </button>
    }else{
    deleteButton = <div></div>}

      return (
        <div key={i} className="comment-card">
          <li key={comment._id}>
            <div className='comment-author-identity'>
              <Link to={`/users/${comment.author._id}`}>
                {comment.author.firstName} {comment.author.lastName}
              </Link> 
            </div>
            {deleteButton}
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