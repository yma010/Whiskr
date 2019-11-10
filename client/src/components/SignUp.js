import React, {useState} from "react";
import {  SIGNUP_USER } from "../graphql/mutations";
import { useMutation } from '@apollo/react-hooks';

function SignUp() {
  let input;
  const [inputs, setInputs] =useState({});
  
  const assignToken = (data) => {
    const { token } = data.register;
    localStorage.setItem("auth-token", token);
    this.props.history.push("/");
  };
  
  const updateCache = (client, { data }) => {
    console.log(data);
    client.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    });
  }
  
  const [SignUpUser, {data}] = useMutation(SIGNUP_USER, {
    update: updateCache,
    onCompleted: assignToken
  });
  
  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
  };
  
    return (
    <form onSubmit={e => {
      e.preventDefault();
      SignUpUser({ variables: { 
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        age: inputs.age,
        email: inputs.email,
        password: inputs.password
      } });
     
    }}>
      <input type="text" onChange={handleInputChange} name="firstName" value={inputs.firstName} placeholder="First name"/>
        <input type="text" onChange={handleInputChange} name="lastName" value={inputs.lastName} placeholder="Last name"/>
        <input type="text" onChange={handleInputChange} name="age" value={inputs.age} placeholder="Age"/>
        <input type="text" onChange={handleInputChange} name="email"  values={inputs.email} placeholder="Email"/>
        <input type="passsword" onChange={handleInputChange} name="password" values={inputs.password} placeholder="Password"/>
      <button type="submit">Sign Up</button>
    </form>
  )

}


// class Register extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       email: "",
//       name: "",
//       password: ""
//     };
//   }

//   update(field) {
//     return e => this.setState({ [field]: e.target.value });
//   }

//   updateCache(client, { data }) {
//     console.log(data);
//     client.writeData({
//       data: { isLoggedIn: data.register.loggedIn }
//     });
//   }

//   render() {
//     return (
//       <Mutation
//         mutation={REGISTER_USER}
//         onCompleted={data => {
//           const { token } = data.register;
//           localStorage.setItem("auth-token", token);
//           this.props.history.push("/");
//         }}
//         update={(client, data) => this.updateCache(client, data)}
//       >
//         {registerUser => (
//           <div>
//             <form
//               onSubmit={e => {
//                 e.preventDefault();
//                 registerUser({
//                   variables: {
//                     email: this.state.email,
//                     password: this.state.password,
//                     name: this.state.name
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
//                 value={this.state.name}
//                 onChange={this.update("name")}
//                 placeholder="Name"
//               />
//               <input
//                 value={this.state.password}
//                 onChange={this.update("password")}
//                 type="password"
//                 placeholder="Password"
//               />
//               <button type="submit">Register</button>
//             </form>
//           </div>
//         )}
//       </Mutation>
//     );
//   }

// }

export default SignUp;