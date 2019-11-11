import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import './forms.css';
import { LOGIN_USER } from "../../graphql/mutations";


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
          data: { isLoggedIn: data.login.loggedIn }
        });
      }
    }
  );

  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
  };

  return (
      <div className="card-container">
        <div className='card'>
          <div className="card-content">
            <h6 className='form-header'>Sign In for Whiskr</h6>
    <form onSubmit={e => {
      e.preventDefault();
      loginUser({
        variables: { email: inputs.email, password: inputs.password }
      });
    }}>
            <div className="card-input">
              <input type="text" onChange={handleInputChange} name="email" value={inputs.email} placeholder="Email address" />
            </div>
            <div className="card-input">
              <input type="password" onChange={handleInputChange} name="password" value={inputs.password} placeholder="Password" />
            </div>
            <button type="submit" className="submit">Sign In</button>
            <div className='grey-bar'></div>
            <p className="message-link">Not a Whiskr member? <Link to='/signup'>Sign up here</Link></p>
    </form>
          </div>
        </div>
      </div>
  );
}

export default withRouter(Login);