import React from "react";
import ReactDOM from "react-dom";
import "bulma/css/bulma.min.css";
// Import Font Awesome CSS
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App";

// The ReactDOM.render() function takes two arguments: the HTML code to render and the DOM element to render it to.
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
