// @flow
import React, { Component } from "react";
import "../styles/Article.css";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Card from "../components/Card";
import ArticleEdit from "../components/ArticleEdit";
import ArticleDelete from "../components/ArticleDelete";
import { getArticleDetails, stringifyTime, stringifyDate } from "../Service";
import CommentBox from "../components/CommentBox";
import Rating from "../components/Rating";

export default class Article extends Component<
  {
    match: { params: { id: number } }
  },
  {
    news: {
      overskrift: string,
      ingress: string,
      innhold: string,
      kategori_navn: string,
      kategori_id: string,
      viktighet: string,
      bilde: string,
      tidspunkt: string,
      tidspunktEndret: string,
      skribent: string,
      tommelOpp: number,
      tommelNed: number
    },
    isLoaded: boolean,
    errorMsg: any
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      news: {},
      isLoaded: false,
      errorMsg: null
    };
  }

  componentDidMount() {
    getArticleDetails(this.props.match.params.id)
      .then((response: any) => {
        console.log(response);
        this.setState({ news: response.data[0] });
        this.setState({ isLoaded: true });
      })
      .catch((error: any) => {
        console.log(error);
        this.setState({ errorMsg: "Error retreiving data" });
      });
  }
  render() {
    const { news, isLoaded, errorMsg } = this.state;
    const articleId: number = this.props.match.params.id;
    if (errorMsg) {
      return <div>{errorMsg.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="home-container bg-light">
          <Navbar />
          <div className="row justify-content-center align-items-center custom-article">
            <Card cardSize="75">
              <img
                className="img-fluid w-100"
                src={news.bilde}
                alt="Bilde"
              ></img>
              <div className="text-box mx-5">
                <p className="text-center h1 my-3">{news.overskrift}</p>
                <br />
                <div className="row justify-content-center align-items-center">
                  <div id="info-text" className="text-center text-muted">
                    Av: {news.skribent} | {stringifyDate(news.tidspunkt)} |{" "}
                    {stringifyTime(news.tidspunkt)}
                    <div className="m-3">
                      SIST ENDRET: {stringifyDate(news.tidspunktEndret)} |{" "}
                      {stringifyTime(news.tidspunktEndret)}
                    </div>
                    <ArticleDelete articleId={articleId} />
                  </div>
                </div>
                <Rating
                  articleId={articleId}
                  upvotes={news.tommelOpp}
                  downvotes={news.tommelNed}
                />

                <br />

                <p className="content-custom">
                  TRONDHEIM ({news.skribent}): {news.ingress}
                </p>
                <br />
                <p>{news.innhold}</p>
                <div className="my-3">
                  <ArticleEdit
                    articleWriter={news.skribent}
                    articleId={articleId}
                    articleTitle={news.overskrift}
                    articleIngress={news.ingress}
                    articleContent={news.innhold}
                    articleImg={news.bilde}
                    articleCategory={news.kategori_navn}
                    articleCategoryId={news.kategori_id}
                    articleImportancy={news.viktighet}
                  />
                  <CommentBox articleId={articleId} />
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
