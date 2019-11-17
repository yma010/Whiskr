import gql from "graphql-tag";

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const FETCH_PHOTOS = gql`
 query FetchPhotos($limit: Int, $offset: Int, $search: String, $user: ID, $filter: String) {
    photos(
      limit: $limit, 
      offset: $offset, 
      search: $search, 
      user: $user,
      filter: $filter
    ) {
     _id
     title
     views
     height
     width
     isPublic
     imageURL
     description
     photographer {
       _id
      firstName
      lastName
      avatarURL
     }
     comments {
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

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser @client {
      _id  
      firstName
      avatarURL
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
        photo {
          _id
        }
        author {
          _id
          firstName
          lastName
          avatarURL
        }
        body
      }
    }
  }
`

export const FETCH_ALBUM_FROM_PHOTO = gql`
         query FetchAlbum($_id: ID!) {
           photo(_id: $_id) {
             
             albums {
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
                 comments {
                   _id
                   author {
                     _id
                     firstName
                     lastName
                     avatarURL
                   }
                   body
                 }
               }
             }
           }
         }
       `;