import React, { Component } from "react";
import "../styles/stylesheet.css";
import Navbar from "../components/Navbar.js";
import News from "../components/News.js";
import Card from "../components/Card";
import LiveFeed from "../components/LiveFeed";
import Footer from "../components/Footer.js";
import Sak from "../components/Sak";
import axios from "axios";

export default class Kultur extends Component {
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
      .get("http://localhost:8000/kultur")
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
          <div className="row justify-content-center align-items-center">
            {news.map(news => newsCard(news))}
          </div>
          <Footer />
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
