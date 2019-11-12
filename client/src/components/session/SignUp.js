import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import './forms.css';
import { SIGNUP_USER, LOGIN_USER } from "../../graphql/mutations";

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

  const [demoLogin] = useMutation(
    LOGIN_USER,
    {
      variables: { email: "niles_mowgli@hotmail.com", password: "hunterhunter" },
      onCompleted(data) {
        const { token } = data.login;
        localStorage.setItem("auth-token", token);
        props.history.push("/");
      },
      update(client, { data }) {
        client.writeData({
          data: {
            isLoggedIn: data.login.loggedIn,
            currentUser: {
              _id: data.login._id,
              firstName: data.login.firstName,
              __typeName: "UserType"
            }
          }
        });
      }
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
        currentUser: {
          _id: data.signup._id,
          firstName: data.signup.firstName,
          __typeName: "UserType"
        }
      }
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
              <input type="number" onChange={handleInputChange} name="age" min="13" value={inputs.age} placeholder="Your age"/>
        </div>
      <div className="card-input">
        <input type="text" onChange={handleInputChange} name="email"  values={inputs.email} placeholder="Email address"/>
      </div>
      <div className="card-input">
        <input type="password" onChange={handleInputChange} name="password" values={inputs.password} placeholder="Password"/>
      </div>
      <button type="submit" className="submit">Sign up</button>
      <a type="submit" className="demo-login" onClick={() => demoLogin()}>Demo login</a>
      <div className='grey-bar'></div>
      <p>Already a Whiskr member? <Link to='/login'>Sign in here</Link></p>
    </form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(SignUp);