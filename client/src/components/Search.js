import React, { Component } from "react";
import Suggestions from "./Suggestion";
import { searchNews } from "../Service";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      query: ""
    };
  }

  handleBlur = () => {
    this.setState({ results: [] });
  };

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
        if (this.state.query.length > 1) {
          this.getInfo();
        } else {
          this.setState({
            results: []
          });
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
          onBlur={this.handleBlur}
        />
        <Suggestions results={this.state.results} />
      </form>
    );
  }
}
