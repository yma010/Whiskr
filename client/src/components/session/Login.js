import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import './forms.css';
import { LOGIN_USER } from "../../graphql/mutations";


function Login(props) {
  const [isAppearing, setIsAppearing] = useState(true);
  const [isDisappearing, setIsDisappearing] = useState(false);

  useEffect(() => {
    if (isAppearing) {
      setTimeout(() => setIsAppearing(false), 100);
    }
  }, [isAppearing]);

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
        setIsDisappearing(true); 
        setTimeout(() => props.history.push("/"), 300);
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

  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
  };

  return (
    <div className="card-container">
      <div className={isAppearing || isDisappearing ? 'card hidden' : 'card'}>
        <div className="card-content">
          <div className="flickr-dots">
            <span className="blue-dot"/>
            <span className="pink-dot"/>
          </div>
          <h6 className='form-header'>Log in to Whiskr</h6>
          <form onSubmit={e => {
            e.preventDefault();
            loginUser({
              variables: { email: inputs.email, password: inputs.password }
            });
          }}>
            <div className="card-input">
              <label className={inputs.email ? "small" : ""}>Email address</label>
              <input required type="text" onChange={handleInputChange} name="email" value={inputs.email} />
            </div>
            <div className="card-input">
              <label className={inputs.password ? "small" : ""}>Password</label>
              <input required type="password" onChange={handleInputChange} name="password" value={inputs.password} />
            </div>
              <button type="submit" className="submit">Sign in</button>
              
              <a 
                type="submit" 
                className="demo-login" 
                onClick={() => loginUser({ variables: { email: "niles_mowgli@hotmail.com", password: "hunterhunter" } })}>
                Demo login
              </a>
            <div className='grey-bar'></div>
            <p>Not a Whiskr member? 
              <a onClick={() => {
                  setIsDisappearing(true); 
                  setTimeout(() => props.history.push("/signup"), 300)
              }}> Sign up here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);