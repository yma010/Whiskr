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
      photo{
        _id
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

export const UPLOAD_FILE_STREAM = gql `
  mutation SingleUploadStream($file: Upload!) {
    singleUploadStream(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;

export const NEW_PHOTO = gql `
  mutation newPhoto( 
    $title: String!,
    $description: String!, 
    $albums: String!, 
    $tags: String!, 
    $imageURL: String!,
    $isPublic: Boolean!
    ) {
      newPhoto
      (
        title: $title,
        description: $description,
        albums: $albums,
        imageURL: $imageURL,
        isPublic: $isPublic
      ) {
        title,
        description,
        albums,
        isPublic
    }
  }
`;

