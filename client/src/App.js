import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import SearchQuestions from './pages/SearchQuestion';
import SavedQuestion from './pages/SavedQuestion';
import Navbar from './components/Navbar';


// The ApolloProvider component wraps the entire application and allows us to share data between all of the components that we will create
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${localStorage.getItem('id_token')}`
  }
});

// Here we creating the set of routes for the application
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchQuestions} />
            <Route exact path='/saved' component={SavedQuestion} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
