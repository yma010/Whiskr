import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';

import { SIGNUP_USER } from "../graphql/mutations";

function SignUp(props) {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: ""
  });
  
  const [signUpUser] = useMutation(
    SIGNUP_USER, 
    {
      onCompleted: data => assignToken(data),
      update: (client, data) => updateCache(client, data)
    }
  );

  const assignToken = data => {
    const { token } = data.signup;
    localStorage.setItem("auth-token", token);
    props.history.push("/");
  };
  
  const updateCache = (client, { data }) => {
    console.log(data);
    client.writeData({
      data: { 
        isLoggedIn: data.signup.loggedIn, 
        currentUserId: data._id
      }
    });
  };
  
  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
  };
  
  return (
    <form onSubmit={e => {
      e.preventDefault();
      signUpUser({ 
        variables: { ...inputs, age: parseInt(inputs.age) }
      });
    }}>
      <input type="text" onChange={handleInputChange} name="firstName" value={inputs.firstName} placeholder="First name"/>
      <input type="text" onChange={handleInputChange} name="lastName" value={inputs.lastName} placeholder="Last name"/>
      <input type="number" onChange={handleInputChange} name="age" value={inputs.age} placeholder="Your age"/>
      <input type="text" onChange={handleInputChange} name="email"  values={inputs.email} placeholder="Email address"/>
      <input type="password" onChange={handleInputChange} name="password" values={inputs.password} placeholder="Password"/>
      <button type="submit">Sign up</button>
    </form>
  );
}

export default withRouter(SignUp);