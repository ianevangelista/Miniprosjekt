// @flow
import React, { Component } from "react";
import Navbar from "../components/Navbar.js";
import News from "../components/News.js";
import LiveFeed from "../components/LiveFeed";
import Footer from "../components/Footer.js";
import Sak from "../components/Sak";
import { getCategory } from "../Service";

export default class Category extends Component<
  {
    match: { params: { id: number } }
  },
  {
    news: Array<{
      sak_id: number,
      overskrift: string,
      ingress: string,
      innhold: string,
      kategori_navn: string,
      kategori_id: number,
      viktighet: number,
      bilde: string,
      tidspunkt: string,
      tidspunktEndret: string,
      skribent: string,
      tommelOpp: number,
      tommelNed: number
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

  // Henter inn alle saker til en gitt kategori
  componentDidMount() {
    getCategory(this.props.match.params.id)
      .then((response: any) => {
        console.log(response);
        if (response.data.length === 0) console.log("Ingen saker");
        else {
          this.setState({ news: response.data });
          this.setState({ isLoaded: true });
        }
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
      return (
        <div>
          Loading... (Ingen saker registrert i denne kategorien, vennligst gå
          tilbake)
        </div>
      );
    } else {
      return (
        <div className="home-container bg-light ">
          <Navbar />
          <LiveFeed />
          <h1 className="text-center text-uppercase">
            {this.state.news[0].kategori_navn}
          </h1>
          <div className="mx-5 px-5 media-custom">
            <div className="card-columns mx-5">
              {news.map(news => newsCard(news))}
            </div>
          </div>
          <Footer />
        </div>
      );
    }
  }
}

// Håndterer cards til saker
function newsCard(news: {
  sak_id: number,
  overskrift: string,
  ingress: string,
  innhold: string,
  kategori_navn: string,
  kategori_id: number,
  viktighet: number,
  bilde: string,
  tidspunkt: string,
  tidspunktEndret: string,
  skribent: string,
  tommelOpp: number,
  tommelNed: number
}) {
  return (
    <News
      title={news.overskrift}
      ingress={news.ingress}
      src={news.bilde}
      id={news.sak_id}
      lastUpdate={news.tidspunkt}
      upvotes={news.tommelOpp}
      downvotes={news.tommelNed}
      bgColor={""}
    ></News>
  );
}
