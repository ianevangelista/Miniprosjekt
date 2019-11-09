import React, { Component } from "react";
import "../styles/stylesheet.css";
import News from "./News.js";
import Card from "./Card";
import Row from "./Row";
import Sak from "./Sak";
import axios from "axios";

export default class BreakingNews extends Component {
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
            news.sak_id,
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
        <div>
          <div className="row justify-content-center align-items-center">
            <News
              title={headline.overskrift}
              src={headline.bilde}
              bgColor="danger"
              id={headline.sak_id}
              lastUpdate={headline.tidspunkt}
            />
          </div>
          <div className="card-columns mx-5">
            {importantNews.map(news => newsCard(news))}
          </div>
        </div>
      );
    }
  }
}
function newsCard(news: Sak) {
  return (
    <News
      title={news.overskrift}
      src={news.bilde}
      alt="Alt tekst"
      id={news.sak_id}
      lastUpdate={news.tidspunkt}
    ></News>
  );
}
