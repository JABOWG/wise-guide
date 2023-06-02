import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './index.css';
import App from './App';

// Create Apollo Client and configure cache
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // replace with your GraphQL server URI
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          savedQuestions: {
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
