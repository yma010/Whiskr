import gql from "graphql-tag";

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
    currentUserId @client
  }
`;

export const CURRENT_USER = gql`
  query CurrentUser($_id: ID) {
    user(_id: $_id) @client {      
      firstName
    }
  }
`;