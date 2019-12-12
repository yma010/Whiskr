import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import './forms.css';
import { SIGNUP_USER, LOGIN_USER } from "../../graphql/mutations";

function SignUp(props) {
  const [isAppearing, setIsAppearing] = useState(true);
  const [isDisappearing, setIsDisappearing] = useState(false);

  useEffect(() => {
    if (isAppearing) {
      setTimeout(() => setIsAppearing(false), 100);
    }
  }, [isAppearing]);

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
      onCompleted: data => {
        assignToken(data);
        setIsDisappearing(true); 
        setTimeout(() => props.history.push("/"), 300);
      },
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
        setIsDisappearing(true); 
        setTimeout(() => props.history.push("/featured-photos"), 300);
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

  const assignToken = data => {
    const { token } = data.signup;
    localStorage.setItem("auth-token", token);
    props.history.push("/");
  };
  
  const updateCache = (client, { data }) => {
    // console.log(data);
    client.writeData({
      data: { 
        isLoggedIn: data.signup.loggedIn, 
        currentUser: {
          _id: data.signup._id,
          firstName: data.signup.firstName,
          avatarURL: data.signup.avatarURL,
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
      <div className={isAppearing || isDisappearing ? 'card hidden' : 'card'}>
        <div className="card-content">
          <div className="flickr-dots">
            <span className="blue-dot"/>
            <span className="pink-dot"/>
          </div>
          <h6 className='form-header'>Sign up for Whiskr</h6>
          <form onSubmit={e => {
            e.preventDefault();
            signUpUser({ 
              variables: { ...inputs, age: parseInt(inputs.age) }
            });
          }}>
            <div className="card-input">
              <label className={inputs.firstName ? "small" : ""}>First name</label>
              <input required type="text" onChange={handleInputChange} name="firstName" value={inputs.firstName} />
            </div>
            <div className="card-input">
              <label className={inputs.lastName ? "small" : ""}>Last name</label>
              <input required type="text" onChange={handleInputChange} name="lastName" value={inputs.lastName} />
            </div>
            <div className="card-input">
              <label className={inputs.age ? "small" : ""}>Your age</label>
              <input required type="number" onChange={handleInputChange} name="age" min="13" value={inputs.age} />
            </div>
            <div className="card-input">
              <label className={inputs.email ? "small" : ""}>Email address</label>
              <input required type="text" onChange={handleInputChange} name="email"  values={inputs.email} />
            </div>
            <div className="card-input">
              <label className={inputs.password ? "small" : ""}>Password</label>
              <input required type="password" onChange={handleInputChange} name="password" values={inputs.password} />
            </div>
              <button type="submit" className="submit">Sign up</button>
              <button type="submit" className="demo-login" onClick={e => { e.preventDefault(); demoLogin(); }}>Demo login</button>
            <div className='grey-bar'></div>
            <p>Already a Whiskr member? 
              <button onClick={e => {
                e.preventDefault();
                setIsDisappearing(true); 
                setTimeout(() => props.history.push("/login"), 300)
              }}> Log in here</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(SignUp);