import React, { Component } from "react";
import Navbar from "../components/Navbar.js";
import News from "../components/News.js";
import LiveFeed from "../components/LiveFeed";
import Footer from "../components/Footer.js";
import Sak from "../components/Sak";
import { getCategory } from "../Service";

export default class Category extends Component<{
  match: { params: { id: number } }
}> {
  constructor(props) {
    super(props);

    this.state = {
      news: [],
      isLoaded: false,
      errorMsg: null
    };
  }

  componentDidMount() {
    getCategory(this.props.match.params.id)
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
        <div className="home-container bg-light ">
          <Navbar />
          <LiveFeed />
          <div className="mx-5 px-5">
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
function newsCard(news: Sak) {
  return (
    <News
      title={news.overskrift}
      ingress={news.ingress}
      src={news.bilde}
      id={news.sak_id}
      lastUpdate={news.tidspunkt}
    ></News>
  );
}
