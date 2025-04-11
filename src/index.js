import React from "react";
import ReactDOM from "react-dom";
//import { BrowserRouter, Route, Switch } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import App from "./app";

// layouts

//import Admin from "layouts/Admin.js";
//import Auth from "layouts/Auth.js";

// views without layouts

//import Landing from "views/Landing.js";
//import Profile from "views/Profile.js";
//import Index from "views/Index.js";
//
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
