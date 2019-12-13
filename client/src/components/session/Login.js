import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
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
  
  const [errors, setErrors] = useState({

  })

  const [loginUser] = useMutation(
    LOGIN_USER, 
    {
      onCompleted(data) {
        const { token } = data.login;
        localStorage.setItem("auth-token", token);
        setIsDisappearing(true); 
        setTimeout(() => props.history.push("/featured-photos"), 300);
      },
      onError: (error) => {
        let err = error.message.split("$").slice(1)
        // console.log(error.message)
        const errors = {};
        let i = 0;
        while (i < err.length) {
          errors[err[i]] = err[i + 1];
          i += 3;
        }
        setErrors(errors);
      // console.log(errors)
      },
      update(client, { data }) {
        client.writeData({
          data: {
            isLoggedIn: data.login.loggedIn,
            currentUser: {
              _id: data.login._id,
              firstName: data.login.firstName,
              avatarURL: data.login.avatarURL,
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
              {errors['email'] ? <p>{errors['email']}</p> : null}
            </div>
            <div className="card-input">
              <label className={inputs.password ? "small" : ""}>Password</label>
              <input required type="password" onChange={handleInputChange} name="password" value={inputs.password} />
              {errors['password'] || errors["validation"] ? <p>{errors["password"], errors["validation"]}</p> : null} 
            </div>
              <button type="submit" className="submit">Sign in</button>
              
              <button 
                type="submit" 
                className="demo-login" 
                onClick={e => { 
                  e.preventDefault(); 
                  loginUser({ variables: { email: "niles_mowgli@hotmail.com", password: "hunterhunter" } })
                }}>
                Demo login
              </button>
            <div className='grey-bar'></div>
            <p>Not a Whiskr member? 
              <button onClick={e => {
                  e.preventDefault();
                  setIsDisappearing(true); 
                  setTimeout(() => props.history.push("/signup"), 300)
              }}> Sign up here</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);