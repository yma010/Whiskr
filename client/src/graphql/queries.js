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
     photographer {
       _id
      firstName
      lastName
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

export const FETCH_PHOTO_COMMENTS = gql`
 query FetchPhotoComments($_id: ID!){
    photo(_id: $_id){
      _id
      comments{
        _id
        author {
          _id
          firstName
          lastName
        }
        body
      }
    }
  }
`