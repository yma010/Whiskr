import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from "./serviceWorker";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import { HashRouter } from "react-router-dom";

import App from './components/App';
import { VERIFY_USER } from './graphql/mutations';

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter>
    </ApolloProvider>
  );
};

const renderApp = () => ReactDOM.render(<Root />, document.getElementById("root"));

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('auth-token');
  return {
    headers: {
      ...headers,
      authorization: token ? token : ''
    }
  };
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const client = new ApolloClient({
  link: authLink.concat(httpLink, errorLink),
  cache,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  },
  resolvers: {}
});

const token = localStorage.getItem("auth-token");

cache.writeData({
  data: {
    isLoggedIn: Boolean(token),
    currentUser: null
  }
});

if (token) {
  client
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
        data: {
          isLoggedIn: data.verifyUser.loggedIn,
          currentUser: {
            _id: data.verifyUser._id,
            firstName: data.verifyUser.firstName,
            __typeName: "UserType"
          }
        }
      });
      renderApp();
    })
} else {
  renderApp();
}

serviceWorker.unregister()
