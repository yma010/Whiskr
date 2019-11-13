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
      token
      loggedIn
    }
  }
`;

export const NEW_COMMENT = gql`
  mutation NewComment( $author: ID!, $photo: ID!, $body: String!){
    newComment(author: $author, photo: $photo, body: $body){
      _id
      body
      author {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($_id: ID!){
    deleteComment(_id: $_id){
      _id
    }
  }
`;