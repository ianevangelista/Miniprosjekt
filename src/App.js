import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Article from "./components/Article";
import Sport from "./pages/Sport";
import "./styles/stylesheet.css";
import Kultur from "./pages/Kultur";
import Search from "./components/Search";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/sak/:id" component={Article} />
        <Route exact path="/sport" component={Sport} />
        <Route exact path="/kultur" component={Kultur} />
        <Route exact path="/sok/:overskrift" component={Search} />
      </HashRouter>
    );
  }
}

export default App;
