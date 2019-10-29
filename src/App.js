import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Article from "./components/Article";
import Sport from "./pages/Sport";
import "./styles/stylesheet.css";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Route exact path="/sak" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/article" component={Article} />
        <Route exact path="/sport" component={Sport} />
      </HashRouter>
    );
  }
}

export default App;
