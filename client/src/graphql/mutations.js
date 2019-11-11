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
      token
      loggedIn
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      loggedIn
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      loggedIn
    }
  }
`;

export const UPLOAD_FILE_STREAM = gql `
  mutation SingleUploadStream($file: Upload!) {
    singleUploadStream(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;
