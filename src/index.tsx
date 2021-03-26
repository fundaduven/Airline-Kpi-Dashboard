import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import "@shopify/polaris/dist/styles.css";
import "./style/styles.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
