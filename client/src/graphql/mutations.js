import gql from 'graphql-tag'; 

export const SIGNUP_USER = gql`
  mutation SignUpUser(
    $firstName: String, 
    $lastName: String,
    $age: Int, 
    $email: String, 
    $password: String,
  ) {
    signup(
      firstName: $firstName, 
      lastName: $lastName, 
      age: $age
      email: $email, 
      password: $password, 
    ) {
      _id
      firstName
      token
      loggedIn
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String, $password: String) {
    login(email: $email, password: $password) {
      _id
      firstName
      token
      loggedIn
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      _id
      firstName
      lastName
      age
      email
      loggedIn
      __typename
    }
  }
`;
