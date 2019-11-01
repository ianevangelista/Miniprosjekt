import React, { Component } from "react";
import "../styles/stylesheet.css";
import "../styles/Article.css";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import axios from "axios";
import Card from "./Card";
import ArticleEdit from "./ArticleEdit";
import ArticleDelete from "./ArticleDelete";

export default class Article extends Component<{
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
    axios
      .get("http://localhost:8000/sak/" + this.props.match.params.id)
      .then(response => {
        console.log(response);
        this.setState({ news: response.data[0] });
        this.setState({ isLoaded: true });
      })
      .catch(error => {
        console.log(error);
        this.setState({ errorMsg: "Error retreiving data" });
      });
  }
  render() {
    const { news, isLoaded, errorMsg } = this.state;
    const articleId = this.props.match.params.id;
    if (errorMsg) {
      return <div>{errorMsg.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="home-container bg-light">
          <Navbar />
          <div className="row justify-content-center align-items-center">
            <Card cardSize="75">
              <div className="row justify-content-center align-items-center">
                <img className="img-fluid" src={news.bilde}></img>
                <div className="text-box">
                  <h1>{this.state.news.overskrift}</h1>
                  <br />
                  <p id="info-text">
                    Av KASPER VEDAL GUNDERSEN | 22.10.2019 | 15:53
                  </p>
                  <br />
                  <p className="mx-auto">
                    NEW YORK (IrishMedia): Det kontroversielle bildet ble delt
                    på Twitter i helgen, og viser Donald Trump som blir drept av
                    hælen til Nancy Pelosi.
                  </p>
                </div>
              </div>
              <ArticleEdit articleId={articleId} />
              <ArticleDelete articleId={articleId} />
            </Card>
          </div>
          <Footer />
        </div>
      );
    }
  }
}
