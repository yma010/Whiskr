import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import './forms.css';
import { SIGNUP_USER } from "../../graphql/mutations";

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
      data: { isLoggedIn: data.signup.loggedIn }
    });
  };
  
  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
  };
  
  return (
    <div className="card-container">
      <div className='card'>
        <div className="card-content">
          <h6 className='form-header'>Sign up for Whiskr</h6>
    <form onSubmit={e => {
      e.preventDefault();
      signUpUser({ 
        variables: { ...inputs, age: parseInt(inputs.age) }
      });
    }}>
      <div className="card-input">
      <input type="text" onChange={handleInputChange} name="firstName" value={inputs.firstName} placeholder="First name"/>
      </div>
      <div className="card-input">
      <input type="text" onChange={handleInputChange} name="lastName" value={inputs.lastName} placeholder="Last name"/>
      </div>
      <div className="card-input">
      <input type="number" onChange={handleInputChange} name="age" value={inputs.age} placeholder="Your age"/>
        </div>
      <div className="card-input">
        <input type="text" onChange={handleInputChange} name="email"  values={inputs.email} placeholder="Email address"/>
      </div>
      <div className="card-input">
        <input type="password" onChange={handleInputChange} name="password" values={inputs.password} placeholder="Password"/>
      </div>
      <button type="submit" className="submit">Sign up</button>
            <p>Already a Whiskr member? <Link to='/login'>Log in here</Link></p>
    </form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(SignUp);