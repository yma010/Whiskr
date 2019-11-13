import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { FETCH_PHOTO_COMMENTS, CURRENT_USER } from '../../graphql/queries';
import { DELETE_COMMENT } from '../../graphql/mutations';
import CreateComment from './CreateComment';
import './comments.css'


function PhotoComments (props) {
  const { loading, error, data } = useQuery(FETCH_PHOTO_COMMENTS,
    { variables: { _id: props.match.params.id }});
  const { data: {currentUser} } = useQuery(CURRENT_USER);
  const [deleteComment] = useMutation(DELETE_COMMENT, 
    {
      update: (cache, data) => { cache.writeQuery({
        query: FETCH_PHOTO_COMMENTS})}
      
    });
    
    
    if (loading) {
      return <div>Loading...</div>
    }
    if (error) {
      console.log(error);
      return <div>Error!</div>
    }

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
    } else {
    deleteButton = <div></div>}

      return (
        <div key={i} className="comment-card">
          <li key={comment._id}>
            <div className='comment-author-identity'>
              <div className="user-avatar"   />
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
        <div className='comments-container'>
        <ul>
          {photoComments}
          <div className="add-comment">
            <CreateComment photoId={data.photo._id} />   
          </div>
        </ul>
        </div>
      </div>
    )
  } 
};

export default PhotoComments;