// @flow
import React, { Component } from "react";
import { Button } from "reactstrap";
import "../styles/Article.css";
import { deleteNews, deleteComment } from "../Service";

export default class ArticleEdit extends Component<{
  commentId?: number
}> {
  deleteHandler = (event: Event) => {
    event.preventDefault();
    if (window.confirm("Er du sikker?")) {
      deleteComment(this.props.commentId)
        .then(response => {
          console.log("nå skal denne slettes");
          alert("Kommentaren er slettet");
          window.location.reload();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <div className="col-1">
        <Button
          className="btn-sm bg-danger fa fa-cut fa-custom"
          onClick={this.deleteHandler}
        >
          <a className="fa fa-custom"> SLETT</a>
        </Button>
      </div>
    );
  }
}
