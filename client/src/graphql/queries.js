import gql from "graphql-tag";

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const FETCH_PHOTOS = gql`
 {
   photos {
     _id
     title
     views
     isPublic
     imageURL
     description
     photographer {
       _id
      firstName
      lastName
      avatarURL
     }
   }
 }
`

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser @client {
      _id  
      firstName
      __typeName
    }
  }
`;
