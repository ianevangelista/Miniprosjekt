import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles/LiveFeed.css";
import { getLiveFeedNews } from "../Service";

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
    getLiveFeedNews()
      .then(response => {
        this.setState({ news: response });
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
        <div className="marquee">
          <div className="bg-dark">
            {getCurrentDate()}
            <br />
            SISTE NYTT
          </div>
          <p className="h-5 text-uppercase">
            {news.map(news => getLatestNews(news))}
          </p>
        </div>
      );
    }
  }
}

function getLatestNews(news: Sak) {
  return (
    <NavLink className="marquee" exact to={"/sak/" + news.sak_id}>
      <a className="font-weight-bold">
        {stringifyDate(news.tidspunkt)} {stringifyTime(news.tidspunkt)}
        {" - "}
      </a>
      <a className="mr-5 text-danger font-weight-bold"> {news.overskrift}</a>
    </NavLink>
  );
}

function stringifyDate(date: String) {
  return date.slice(0, 10);
}

function stringifyTime(date: String) {
  return date.slice(11, 16);
}

function getCurrentDate(separator = ".") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return (
    <a className="text-white mr-5 my-auto">
      {date}
      {separator}
      {month < 10 ? `0{month}` : `${month}`}
      {separator}
      {year}
    </a>
  );
}
