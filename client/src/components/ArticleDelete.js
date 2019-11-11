import React, { Component } from "react";
import { Button } from "reactstrap";
import "../styles/Article.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import Card from "./Card";
import Sak from "./Sak";
import {
  Container,
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";
import { createHashHistory } from "history";
import { deleteNews } from "../Service";

// Use history.push(...) to programmatically change path, for instance after successfully editing an article
const history = createHashHistory();

export default class ArticleEdit extends Component<{
  articleId?: number
}> {
  deleteHandler = e => {
    e.preventDefault();
    if (window.confirm("Er du sikker?")) {
      deleteNews(this.props.articleId)
        .then(response => {
          alert("Saken er slettet");
          window.location.hash = "";
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <div>
        <Button
          className="bg-danger fa fa-cut fa-custom"
          onClick={this.deleteHandler}
        >
          {" "}
          <a className="fa-custom">SLETT SAK</a>
        </Button>
      </div>
    );
  }
}
