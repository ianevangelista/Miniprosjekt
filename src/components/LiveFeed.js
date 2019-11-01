import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "../styles/LiveFeed.css";

export default class LiveFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      news: [],
      isLoaded: false,
      errorMsg: null
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/sak")
      .then(response => {
        console.log(response);
        this.setState({ news: response.data });
        this.setState({ isLoaded: true });
      })
      .catch(error => {
        console.log(error);
        this.setState({ errorMsg: "Error retreiving data" });
      });
  }

  render() {
    const { news, isLoaded, errorMsg } = this.state;
    if (errorMsg) {
      return <div>{errorMsg.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div class="marquee">
          <div>SISTE NYTT</div>
          <p>{news.map(news => getLatestNews(news))}</p>
        </div>
      );
    }
  }
}

function getLatestNews(news: Sak) {
  return (
    <NavLink className="marquee" exact to={"/sak/" + news.sak_id}>
      <a style={{ marginRight: "10rem" }}>{news.overskrift} </a>
    </NavLink>
  );
}
