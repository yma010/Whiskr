import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';

import { LOGIN_USER } from "../graphql/mutations";


function Login(props) {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  
  const [loginUser] = useMutation(
    LOGIN_USER, 
    {
      onCompleted(data) {
        const { token } = data.login;
        localStorage.setItem("auth-token", token);
        props.history.push("/");
      },
      update(client, { data }) {
        client.writeData({
          data: { 
            isLoggedIn: data.login.loggedIn,
            currentUserId: data._id
          }
        });
      }
    }
  );

  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
  };

  return (
    <form onSubmit={e => {
      e.preventDefault();
      loginUser({
        variables: { email: inputs.email, password: inputs.password }
      });
    }}>
      <input type="text" onChange={handleInputChange} name="email" value={inputs.email} placeholder="Email address" />
      <input type="password" onChange={handleInputChange} name="password" value={inputs.password} placeholder="Password" />
      <button type="submit">Sign in</button>
    </form>
  );
}

export default withRouter(Login);