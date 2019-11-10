import React from "react";
import { Link } from "react-router-dom";
import { Query, ApolloConsumer } from "react-apollo";
import { IS_LOGGED_IN } from "../graphql/queries";
import { useQuery } from '@apollo/react-hooks'


const Navbar = props => {
  
  const {loading, error, data} = useQuery(IS_LOGGED_IN);
  
  // return (
    
    if (data.isLoggedIn) {
      return (
        <ApolloConsumer>
          {client => (

      <button
      onClick={e => {
        e.preventDefault();
        localStorage.removeItem("auth-token");
        client.writeData({ data: { isLoggedIn: false } });
        props.history.push("/");
      }}
      >
        Logout
      </button>
          )}
      </ApolloConsumer>
    )
  } else {
    return (
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    );
  }
};

export default Navbar;