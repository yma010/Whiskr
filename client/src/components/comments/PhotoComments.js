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
  const [DeleteComment] = useMutation(DELETE_COMMENT, 
    { 
      refetchQueries: [{query: FETCH_PHOTO_COMMENTS, 
        variables: {
          _id: props.match.params.id
        }
      }],
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

      return (
        <div key={i} className="comment-card">
          <li key={comment._id}>
            <div className="avatar" >
              <span className="user-avatar"  />
            </div>
            <div className='comment-content'>
            <div className='comment-author-identity'>
              <Link to={`/users/${comment.author._id}`}>
                {comment.author.firstName} {comment.author.lastName}
              </Link> 
            </div>
            <div className='comment-body'>
              <p>{comment.body}</p>
              </div>
            </div>
            <div className='delete'>
              {deleteButton}
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