// @flow
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles/LiveFeed.css";
import { getLiveFeedNews, stringifyDate, stringifyTime } from "../Service";

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

  // Henter de 5 siste nyhetene uansett viktighet
  componentDidMount() {
    getLiveFeedNews()
      .then((response: any) => {
        this.setState({ news: response.data });
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

// Setter formatet på hvordan nyhetene skal bli vist
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

// Henter dagens dato og tid
function getCurrentDate(separator: string = ".") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  var time = newDate.getHours() + ":" + newDate.getMinutes();

  return (
    <a className="text-white my-auto">
      {date}
      {separator}
      {month < 10 ? `0{month}` : `${month}`}
      {separator}
      {year} {" - " + time}
    </a>
  );
}
