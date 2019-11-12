import React, { useState, useQuery } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { CURRENT_USER } from '../../graphql/queries';
import './comments.css'
import { NEW_COMMENT } from '../../graphql/mutations';


function CreateComment(props) {
  const [input, setInput] = useState({
    body: ''
  });

  const [newComment] = useMutation(NEW_COMMENT,
    {
      
  });

  const { data: { currentUser } } = useQuery(CURRENT_USER);


  const handleInputChange = event => {
    event.persist();
    setInput(input =>  ({ [event.target.name]: event.target.value }))
  };

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        if (currentUser){
          newComment({
            variables: { 
              body: input.body,
              photo: props.match.params.id,
              author: currentUser._id
            }
          })
        } else {
          console.log('not logged in!')
        }
      }}>
        <textearea type="text" onChange={handleInputChange} name="body" value={input.body}  placeholder="Add a comment"></textearea>
        <button type="submit">Comment</button>
      </form>
    </div>
  )
};

export default CreateComment;