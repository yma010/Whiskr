import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { CURRENT_USER, FETCH_PHOTO_COMMENTS } from '../../graphql/queries';
import './comments.css';
import { NEW_COMMENT } from '../../graphql/mutations';

function CreateComment(props) {
  
  const [newComment] = useMutation(
    NEW_COMMENT,
    {
      onCompleted: (data) => { 
        setBody('')},
      update: (cache, data) => { updateCache(cache, data)},
      refetchQueries: [{query: FETCH_PHOTO_COMMENTS, 
        variables: {
          _id: props.photoId
        }}]
    });
    
  const {loading, error, data} = useQuery(CURRENT_USER);

    let {currentUser} = data;
  const [Inputbody, setBody] = useState('');

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    console.log(error);
    return <div>Error!</div>
  }


  const updateCache = (cache, {data}) => {
    let photoInfo;
    try {
      photoInfo = cache.readQuery({ query: FETCH_PHOTO_COMMENTS, variables: {
        _id: props.photoId} });
    } catch(err){
      return;
    }
    if (photoInfo){
      let commentsArr = photoInfo.photo.comments;
      let newComment = data.newComment;
      
      cache.writeQuery({
        query: FETCH_PHOTO_COMMENTS,
         variables: {
          _id: props.photoId
        },
        data: {
          photo: {
            _id: props.photoId,
            __typename: "PhotoType",
            comments: commentsArr.concat([newComment])
          } 
        }
      });
     
    }
  };
  
  let style;
  if (currentUser.avatarURL) {
    style = {
      backgroundImage: `url(${currentUser.avatarURL})`
    }
  }
  return (
    <div className="new-comment-body" id="new-comment">
      <div
        className="user-avatar"
        style ={style}
        // to={currentUser ? `/users/${currentUser._id}` : ""}
      ></div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (currentUser) {
            newComment({
              variables: {
                body: Inputbody,
                photo: props.photoId,
                author: currentUser._id
              }
            });
          } else {
            console.log("not logged in!");
          }
        }}
      >
        <textarea
          type="text"
          onChange={e => setBody(e.target.value)}
          name="body"
          value={Inputbody}
          placeholder="Add a comment"
        ></textarea>
        <div className="comment-arrow"></div>
        <button type="submit">Comment</button>
      </form>
    </div>
  );

};

export default CreateComment;