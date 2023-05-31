import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// import your components
// import NewQuestion from "./components/NewQuestion";
// import QuestionHistory from "./components/QuestionHistory";
import Navbar from "./components/Navbar";

// The ApolloProvider component wraps the entire application and allows us to share data between all of the components that we will create
const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${localStorage.getItem("id_token")}`,
  },
});

// Here we creating the set of routes for the application
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            {/* new routes for NewQuestion and QuestionHistory */}
            {/* <Route exact path="/new-question" component={NewQuestion} /> */}
            {/* <Route exact path="/question-history" component={QuestionHistory} /> */}
            {/* redirect to '/new-question' if no match */}
            {/* <Route render={() => <Redirect to="/new-question" />} /> */}
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
