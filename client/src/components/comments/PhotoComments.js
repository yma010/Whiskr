import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { FETCH_PHOTO_COMMENTS, CURRENT_USER } from '../../graphql/queries';
import { DELETE_COMMENT } from '../../graphql/mutations';
import CreateComment from './CreateComment';
import './comments.css'


function PhotoComments (props) {
  const { data: {currentUser} } = useQuery(CURRENT_USER);
  const { data } = useQuery(FETCH_PHOTO_COMMENTS, {
    variables: { _id: props.photoId }
  });
  const [DeleteComment] = useMutation(DELETE_COMMENT, 
    { 
      refetchQueries: [{query: FETCH_PHOTO_COMMENTS, 
        variables: {
          _id: props.photoId
        }
      }],
    });

  if (!data){
      return null;
  } else {
    let photoComments;
    let deleteButton;
    photoComments = data.photo.comments.map( (comment, i) => {
     if (currentUser && currentUser._id === comment.author._id) {
       deleteButton = (
         <button
           className="delete-button"
           onClick={e => {
             e.preventDefault();
             DeleteComment({ variables: { _id: comment._id } });
           }}
         ></button>
       );
     } else {
       deleteButton = <div></div>;
     }

     let style;
      if (comment.author.avatarURL){
        style = {
          backgroundImage: `url(${comment.author.avatarURL})`
        }
      }
      return (
        <div key={i} className="comment-card">
          <li key={comment._id}>
            <div className="avatar">
              <Link
                className="user-avatar"
                to={`/users/${comment.author._id}/photos`}
                style={style}
              />
            </div>
            <div className="comment-content">
              <div className="comment-author-identity">
                <Link to={`/users/${comment.author._id}/photos`}>
                  {comment.author.firstName} {comment.author.lastName}
                </Link>
              <div className="delete">{deleteButton}</div>
              </div>
              <div className="comment-body">
                <p>{comment.body}</p>
              </div>
            </div>
          </li>
        </div>
      );
    })
    return (
      <div id="comments">
        <div className='comments-container'>
        <ul>
          {photoComments}
          <div className="add-comment">
            <CreateComment photoId={props.photoId} />   
          </div>
        </ul>
        </div>
      </div>
    )
  } 
};

export default PhotoComments;