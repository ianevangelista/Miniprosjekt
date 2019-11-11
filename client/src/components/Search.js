import React, { Component } from "react";
import Navbar from "./Navbar";
import News from "./News";
import Card from "./Card";
import LiveFeed from "./LiveFeed";
import Footer from "./Footer";
import Sak from "./Sak";
import axios from "axios";
import Suggestions from "./Suggestion";
import { searchNews } from "../Service";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      query: ""
    };
  }

  getInfo = () => {
    searchNews(this.state.query)
      .then(response => {
        this.setState({ results: response.data });
      })
      .catch(error => {
        console.log(error);
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
