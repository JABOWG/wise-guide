import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import SearchQuestions from "./pages/SearchQuestion";
import SavedQuestion from "./pages/SavedQuestion";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";

import "./App.css";

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
    <div id="app" style={{}}>
      <ApolloProvider client={client}>
        <Router>
          <>
            <Navbar />
            <div
              id="content"
              style={{
                backgroundImage: 'url("/Main-background.jpg")',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
              }}
            >
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/search" component={SearchQuestions} />
                <Route exact path="/saved" component={SavedQuestion} />
                <Route
                  render={() => <h1 className="display-2">Wrong page!</h1>}
                />
              </Switch>
            </div>
            <footer className="thefooter">
              <div className="content">
                <p> Wise Guide: Your Personal Tutor | Version# 1.1.0/2023</p>
              </div>
            </footer>
          </>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
