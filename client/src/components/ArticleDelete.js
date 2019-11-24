// @flow
import React, { Component } from "react";
import { Button } from "reactstrap";
import "../styles/Article.css";
import { deleteNews } from "../Service";

// Component for å slette en sak
export default class ArticleEdit extends Component<{
  articleId?: number
}> {
  deleteHandler = (event: Event) => {
    console.log(this.props.articleId);
    event.preventDefault();
    // Får opp bekreftelse
    if (window.confirm("Er du sikker?")) {
      deleteNews(this.props.articleId)
        .then(response => {
          alert("Saken er slettet");
          window.location.hash = "/";
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <div className="my-3">
        <Button
          className="bg-danger fa fa-cut fa-custom border-0"
          onClick={this.deleteHandler}
        >
          <a className="fa-custom"> SLETT SAK</a>
        </Button>
      </div>
    );
  }
}
