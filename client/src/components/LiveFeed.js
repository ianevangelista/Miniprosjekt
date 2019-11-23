// @flow
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles/LiveFeed.css";
import { getLiveFeedNews } from "../Service";

export default class LiveFeed extends Component<
  {},
  {
    news: Array<{
      overskrift: string,
      sak_id: number,
      tidspunkt: string
    }>,
    isLoaded: boolean,
    errorMsg: any
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      news: [],
      isLoaded: false,
      errorMsg: null
    };
  }

  componentDidMount() {
    getLiveFeedNews()
      .then((response: any) => {
        this.setState({ news: response });
        this.setState({ isLoaded: true });
      })
      .catch((error: any) => {
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
            SISTE NYTT
            <br />
            {getCurrentDate()}
          </div>
          <p className="text-uppercase livefeed-text">
            {news.map(news => getLatestNews(news))}
          </p>
        </div>
      );
    }
  }
}

function getLatestNews(news: {
  overskrift: string,
  sak_id: number,
  tidspunkt: string
}) {
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

function stringifyDate(date: string) {
  return date.slice(0, 10);
}

function stringifyTime(date: string) {
  return date.slice(11, 16);
}

function getCurrentDate(separator: string = ".") {
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
