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
    console.log(this.props.match.params.id);
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
            <Card cardSize="50">
              <div className="row justify-content-center align-items-center">
                <img className="img-fluid" src={news.bilde}></img>
                <div className="text-box mx-5">
                  <p className="text-center h1">{news.overskrift}</p>
                  <br />
                  <p id="info-text" className="text-center">
                    Av: IAN EVANGELISTA | {stringifyDate(news.tidspunkt)} |{" "}
                    {stringifyTime(news.tidspunkt)}
                  </p>
                  <br />
                  <p className="content-custom">
                    TRONDHEIM (Ian Evangelista): {news.innhold}
                  </p>
                </div>
              </div>
              <div className="my-3">
                <ArticleEdit
                  articleId={articleId}
                  articleTitle={news.overskrift}
                  articleContent={news.innhold}
                  articleImg={news.bilde}
                  articleCategory={news.kategori_navn}
                  articleImportancy={news.viktighet}
                />
              </div>
              <ArticleDelete articleId={articleId} />
            </Card>
          </div>
          <Footer />
        </div>
      );
    }
  }
}

function stringifyDate(date: String) {
  return date.slice(0, 10);
}

function stringifyTime(date: String) {
  return date.slice(11, 16);
}
