// @flow
import React, { Component } from "react";
import Suggestions from "./Suggestion";
import { searchNews } from "../Service";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export default class Search extends Component<
  {},
  { results: Array<{ sak_id: string, overskrift: string }>, query: string }
> {
  constructor(props: any) {
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
      .then((response: any) => {
        this.setState({ results: response.data });
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  search: HTMLInputElement;

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
          ref={(input: any) => (this.search = input)}
          onChange={this.handleInputChange}
          onBlur={this.handleBlur}
        />
        <Suggestions results={this.state.results} />
      </form>
    );
  }
}
