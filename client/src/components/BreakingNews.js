import React, { Component } from "react";
import News from "./News";
import Sak from "./Sak";
import { getBreakingNews } from "../Service";

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
    getBreakingNews()
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

      var headline = newsList[0];
      newsList.shift();
      return (
        <div className="mx-5 px-5">
          <div className="row justify-content-center align-items-center mx-5">
            <News
              title={headline.overskrift}
              src={headline.bilde}
              bgColor="danger"
              id={headline.sak_id}
              lastUpdate={headline.tidspunkt}
              cardSize="50"
            />
          </div>
          <div className="card-columns mx-5">
            {newsList.map(news => newsCard(news))}
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
      id={news.sak_id}
      lastUpdate={news.tidspunkt}
    ></News>
  );
}
