import React, { Component } from "react";
import "../styles/Article.css";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Card from "../components/Card";
import ArticleEdit from "../components/ArticleEdit";
import ArticleDelete from "../components/ArticleDelete";
import { getArticleDetails } from "../Service";

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
    getArticleDetails(this.props.match.params.id)
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
              <img className="img-fluid" src={news.bilde} alt="Bilde"></img>
              <div className="text-box mx-5">
                <p className="text-center h1 my-3">{news.overskrift}</p>
                <br />
                <p id="info-text" className="text-center">
                  Av: IAN EVANGELISTA | {stringifyDate(news.tidspunkt)} |{" "}
                  {stringifyTime(news.tidspunkt)}
                </p>
                <br />
                <p className="content-custom">
                  TRONDHEIM (Ian Evangelista): {news.innhold}
                </p>
                <div className="my-3">
                  <ArticleEdit
                    articleId={articleId}
                    articleTitle={news.overskrift}
                    articleContent={news.innhold}
                    articleImg={news.bilde}
                    articleCategory={news.kategori_navn}
                    articleImportancy={news.viktighet}
                  />
                  <ArticleDelete articleId={articleId} />
                </div>
              </div>
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
