import gql from 'graphql-tag'; 

export const SIGNUP_USER = gql`
  mutation RegisterUser(
    $firstName: String, 
    $lastName: String,
    $age: Integer, 
    $email: String, 
    $password: String,
    ) {
    signup(
      firstname: $firstName, 
      lastname: $lastName, 
      age: $age
      email: $email, 
      password: $password, 
      ) {
      token
      loggedIn
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      loggedIn
    }
  }
`;
