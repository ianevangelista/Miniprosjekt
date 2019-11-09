import React, { Component } from "react";
import { Button } from "reactstrap";
import "../styles/stylesheet.css";
import "../styles/Article.css";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
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

// Use history.push(...) to programmatically change path, for instance after successfully editing an article
const history = createHashHistory();

export default class ArticleEdit extends Component<{
  articleId?: number
}> {
  deleteHandler = e => {
    e.preventDefault();
    axios
      .delete("http://localhost:8000/sak/" + this.props.articleId)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    showAlert();
    history.push("");
  };

  render() {
    return (
      <div>
        <Button className="bg-danger" onClick={this.deleteHandler}>
          Slett sak
        </Button>
      </div>
    );
  }
}

function showAlert() {
  alert("Saken er slettet");
}
