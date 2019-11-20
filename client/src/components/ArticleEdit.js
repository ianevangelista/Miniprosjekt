// @flow

import React, { Component } from "react";
import { Button } from "reactstrap";
import "../styles/Article.css";
import {
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";
import { editNews, getAllCategories } from "../Service";

export default class ArticleEdit extends Component<{
  articleId?: number,
  articleTitle?: string,
  articleIngress?: String,
  articleContent?: string,
  articleImg?: string,
  articleCategory?: string,
  articleCategoryId?: number,
  articleImportancy?: number
}> {
  constructor(props) {
    super(props);

    this.state = {
      overskrift: this.props.articleTitle,
      ingress: this.props.articleIngress,
      innhold: this.props.articleContent,
      bilde: this.props.articleImg,
      kategori_id: this.props.articleCategoryId,
      viktighet: this.props.articleImportancy,

      categories: [],
      showInputForm: false,
      dropdownOpen: false,
      dropdownOpenImportancy: false,
      valueCategory:
        this.props.articleCategoryId + ". " + this.props.articleCategory,
      valueImportancy: this.props.articleImportancy
    };

    this.toggleForm = this.toggleForm.bind(this);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.toggleImportancy = this.toggleImportancy.bind(this);
    this.selectImportancy = this.selectImportancy.bind(this);
    this.required = this.required.bind(this);
  }

  componentDidMount() {
    getAllCategories()
      .then(response => {
        console.log(response);
        this.setState({ categories: response });
      })
      .catch(error => {
        console.log(error);
      });
  }

  required() {
    if (
      this.state.overskrift === "" ||
      this.state.ingress === "" ||
      this.state.innhold === "" ||
      this.state.bilde === "" ||
      this.state.kategori_id === "" ||
      this.state.viktighet === ""
    ) {
      return false;
    }
    return true;
  }

  editHandler = e => {
    e.preventDefault();
    if (window.confirm("Er du sikker?")) {
      if (this.required()) {
        editNews(this.props.articleId, this.state)
          .then(response => {
            alert("Saken er endret");
            window.location.hash = "";
          })
          .catch(error => {
            console.log(error);
          });
      } else alert("Vennligst fyll inn alle feltene");
    }
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleForm = () => {
    const { showInputForm } = this.state.showInputForm;
    this.setState({
      showInputForm: !this.state.showInputForm
    });
  };

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleImportancy() {
    this.setState({
      dropdownOpenImportancy: !this.state.dropdownOpenImportancy
    });
  }

  select(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      valueCategory: event.target.innerText
    });
    this.setState({
      kategori_id: checkCategory(event.target.innerText)
    });
  }

  selectImportancy(event) {
    this.setState({
      dropdownOpenImportancy: !this.state.dropdownOpenImportancy,
      valueImportancy: event.target.innerText
    });
    this.setState({
      viktighet: checkImportancy(event.target.innerText)
    });
  }
  render() {
    const {
      overskrift,
      ingress,
      innhold,
      bilde,
      kategori_id,
      viktighet,
      categories
    } = this.state;
    return (
      <div className="my-3">
        {this.state.showInputForm && (
          <form onSubmit={this.editHandler}>
            <div class="form-group">
              <label>Tittel:</label>
              <input
                type="text"
                name="overskrift"
                value={overskrift}
                onChange={this.changeHandler}
                class="form-control"
                placeholder="Skriv inn tittelen til din sak"
              ></input>
            </div>
            <div class="form-group">
              <label>Ingress:</label>
              <input
                type="text"
                name="ingress"
                value={ingress}
                onChange={this.changeHandler}
                class="form-control"
                placeholder="Skriv inn ingressen til din sak"
              ></input>
            </div>
            <div class="form-group">
              <label>Beskrivelse:</label>
              <textarea
                type="text"
                name="innhold"
                class="form-control"
                value={innhold}
                onChange={this.changeHandler}
                placeholder="Skriv inn det innholdet du ønsker vist i saken"
                rows="5"
              ></textarea>
            </div>
            <div class="form-group">
              <label>Bilde-URL:</label>
              <input
                type="text"
                name="bilde"
                value={bilde}
                onChange={this.changeHandler}
                class="form-control"
                placeholder="Skriv inn bilde-URL til din sak"
              ></input>
            </div>
            <div className="row">
              <div class="form-group col-4">
                <label>Kategori:</label>
                <ButtonDropdown
                  className="ml-3"
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggle}
                >
                  <DropdownToggle>{this.state.valueCategory}</DropdownToggle>
                  <DropdownMenu
                    onClick={this.select}
                    onChange={this.changeHandler}
                  >
                    {categories.map(category => getCategories(category))}
                  </DropdownMenu>
                </ButtonDropdown>
              </div>
              <div class="form-group col-4">
                <label>Viktighet:</label>
                <ButtonDropdown
                  className="ml-3"
                  isOpen={this.state.dropdownOpenImportancy}
                  toggle={this.toggleImportancy}
                >
                  <DropdownToggle>{this.state.valueImportancy}</DropdownToggle>
                  <DropdownMenu
                    onClick={this.selectImportancy}
                    onChange={this.changeHandler}
                  >
                    <DropdownItem>1</DropdownItem>
                    <DropdownItem>2</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </div>
              <div className="col-4">
                <button
                  type="submit"
                  className="btn btn-success fa fa-save fa-custom"
                >
                  <a className="fa-custom"> LAGRE</a>
                </button>
              </div>
            </div>
          </form>
        )}
        <Button className="fa fa-edit fa-custom" onClick={this.toggleForm}>
          <a className="fa-custom"> ENDRE SAK</a>
        </Button>
      </div>
    );
  }
}
function checkCategory(category) {
  return category.substring(0, 1);
}

function getCategories(category) {
  return (
    <DropdownItem>
      {category.kategori_id}. {category.kategori_navn}
    </DropdownItem>
  );
}

function checkImportancy(importancy: string) {
  if (importancy.length > 1) return null;
  else return importancy;
}
