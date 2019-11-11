import gql from "graphql-tag";

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const FETCH_PHOTOS = gql`
 query fetchPhotos{
   photos (first: 3) {
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
