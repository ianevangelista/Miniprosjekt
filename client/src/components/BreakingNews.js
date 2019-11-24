// @flow
import React, { Component } from "react";
import News from "./News";
import Sak from "./Sak";
import { getBreakingNews } from "../Service";
import { NavLink } from "react-router-dom";

export default class BreakingNews extends Component<
  {},
  {
    news: Array<Sak>,
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

  // Henter inn nyeste saker med viktighet 1
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
            news.ingress,
            news.innhold,
            news.tidspunkt,
            news.tidspunktEndret,
            news.bilde,
            news.kategori_navn,
            news.viktighet,
            news.tommelOpp,
            news.tommelNed
          )
        );
      });

      var headline = newsList[0];
      newsList.shift();
      return (
        <div className="mx-5 px-5 media-custom">
          <div className="row justify-content-center align-items-center mx-5">
            <div className="mx-5 px-5 media-custom">
              <News
                title={headline.overskrift}
                ingress={headline.ingress}
                src={headline.bilde}
                bgColor="danger"
                id={headline.sak_id}
                written={headline.tidspunkt}
                lastUpdate={headline.tidspunktEndret}
                upvotes={headline.tommelOpp}
                downvotes={headline.tommelNed}
                bgColor={""}
              />
            </div>
          </div>

          <div className="card-columns mx-5">
            {newsList.map(news => newsCard(news))}
          </div>
        </div>
      );
    }
  }
}

// Bruker News-komponenten slik man videre kan bruke det i map
function newsCard(news: Sak) {
  return (
    <News
      title={news.overskrift}
      ingress={news.ingress}
      src={news.bilde}
      id={news.sak_id}
      written={news.tidspunkt}
      lastUpdate={news.tidspunktEndret}
      upvotes={news.tommelOpp}
      downvotes={news.tommelNed}
      bgColor={""}
    ></News>
  );
}
