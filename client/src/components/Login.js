import React, { useState }from "react";
import {  LOGIN_USER } from "../graphql/mutations";
import { useMutation } from '@apollo/react-hooks';


function Login() {
  const [inputs, setInputs] = useState({});

  
  
  const updateCache = (client, { data }) => {
    console.log(data);
    client.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    });
  }
  const [LoginUser, { data }] = useMutation(LOGIN_USER, {
    onCompleted({data}){
          const { token } = data.login;
          localStorage.setItem("auth-token", token);
          this.props.history.push("/");
        }
  });

  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
  };

  return (
    <form onSubmit={e => {
      e.preventDefault();
      LoginUser({
        variables: { email: inputs.email, password: inputs.password }});
      inputs.email = '';
      inputs.password = '';
    }}>
      <input type="text" onChange={handleInputChange} name="email" value={inputs.email} placeholder="Email" />
      <input type="passsword" onChange={handleInputChange} name="password" value={inputs.password} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  )

}

export default Login;

// class Login extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       email: "",
//       password: ""
//     };
//   }

//   update(field) {
//     return e => this.setState({ [field]: e.target.value });
//   }

//   updateCache(client, { data }) {
//     console.log(data);
//     client.writeData({
//       data: { isLoggedIn: data.login.loggedIn }
//     });
//   }

//   render() {
//     return (
//       <Mutation
//         mutation={LOGIN_USER}
//         onCompleted={data => {
//           const { token } = data.login;
//           localStorage.setItem("auth-token", token);
//           this.props.history.push("/");
//         }}
//         update={(client, data) => this.updateCache(client, data)}
//       >
//         {loginUser => (
//           <div>
//             <form
//               onSubmit={e => {
//                 e.preventDefault();
//                 loginUser({
//                   variables: {
//                     email: this.state.email,
//                     password: this.state.password
//                   }
//                 });
//               }}
//             >
//               <input
//                 value={this.state.email}
//                 onChange={this.update("email")}
//                 placeholder="Email"
//               />
//               <input
//                 value={this.state.password}
//                 onChange={this.update("password")}
//                 type="password"
//                 placeholder="Password"
//               />
//               <button type="submit">Log In</button>
//             </form>
//           </div>
//         )}
//       </Mutation>
//     );
//   }

// }

// export default Login;