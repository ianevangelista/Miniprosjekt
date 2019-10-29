import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles/stylesheet.css";
import Navbar from "../components/Navbar.js";
import News from "../components/News.js";
import Card from "../components/Card";
import Row from "../components/Row";
import Column from "../components/Column";
import Sak from "../components/Sak";
import axios from "axios";

export default class BigNews extends Component {
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
      var newsList = [];
      news.map(news => {
        newsList.push(
          new Sak(
            news.overskrift,
            news.innhold,
            news.tidspunkt,
            news.bilde,
            news.kategori_navn,
            news.viktighet
          )
        );
      });
      var importantNews = newsList.filter(e => e.viktighet === 1);
      var headline = importantNews[0];
      importantNews.shift();
      return (
        <div className="row justify-content-center align-items-center">
          <Card cardSize="100">
            <Row>
              <News
                title={headline.overskrift}
                src={headline.bilde}
                alt="Trump og Northug jr."
                href="/article"
              />
            </Row>
          </Card>
          {importantNews.map(news => newsCard(news))}
        </div>
      );
    }
  }
}
function newsCard(news: Sak) {
  return (
    <Card cardSize="25">
      <News
        title={news.overskrift}
        src={news.bilde}
        alt="Alt tekst"
        href="#"
        colSize="4"
      ></News>
    </Card>
  );
}
