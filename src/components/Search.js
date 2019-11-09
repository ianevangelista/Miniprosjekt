import React, { Component } from "react";
import "../styles/stylesheet.css";
import Navbar from "../components/Navbar.js";
import News from "../components/News.js";
import Card from "../components/Card";
import LiveFeed from "../components/LiveFeed";
import Footer from "../components/Footer.js";
import Sak from "../components/Sak";
import axios from "axios";
import Suggestions from "./Suggestion";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      query: ""
    };
  }

  getInfo = () => {
    axios
      .get("http://localhost:8000/sok/" + this.state.query)
      .then(response => {
        console.log(response);
        this.setState({ results: response.data });
      });
  };

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getInfo();
          }
        }
      }
    );
  };

  render() {
    return (
      <form>
        <input
          className="mt-4 rounded"
          placeholder="Søk etter sak"
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
        <Suggestions results={this.state.results} />
      </form>
    );
  }
}
