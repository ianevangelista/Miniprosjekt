// @flow
import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Category from "./pages/Category";
import Search from "./components/Search";

class App extends Component<{}> {
  render() {
    return (
      <HashRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/sak/:id" component={Article} />
        <Route exact path="/kategori/:id" component={Category} />
        <Route exact path="/sok/:overskrift" component={Search} />
      </HashRouter>
    );
  }
}

export default App;
