// @flow
import React, { Component } from "react";
import Navbar from "../components/Navbar.js";
import BigNews from "../components/BreakingNews.js";
import LiveFeed from "../components/LiveFeed";
import Footer from "../components/Footer.js";

export default class Home extends Component<{}> {
  render() {
    return (
      <div className="home-container bg-light ">
        <Navbar />
        <LiveFeed />
        <BigNews />
        <Footer />
      </div>
    );
  }
}
