import React, { Component } from "react";
import { Button } from "reactstrap";
import "../styles/Article.css";
import axios from "axios";
import {
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";
import { createHashHistory } from "history";
import { editNews } from "../Service";
// Use history.push(...) to programmatically change path, for instance after successfully editing an article
const history = createHashHistory();

export default class ArticleEdit extends Component<{
  articleId?: number,
  articleTitle?: string,
  articleContent?: string,
  articleImg?: string,
  articleCategory?: string,
  articleImportancy?: number
}> {
  constructor(props) {
    super(props);

    this.state = {
      overskrift: this.props.articleTitle,
      innhold: this.props.articleContent,
      bilde: this.props.articleImg,
      kategori_id: checkCategory(this.props.articleCategory),
      viktighet: this.props.articleImportancy,

      showInputForm: false,
      dropdownOpen: false,
      dropdownOpenImportancy: false,
      valueCategory: this.props.articleCategory,
      valueImportancy: this.props.articleImportancy
    };

    this.toggleForm = this.toggleForm.bind(this);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.toggleImportancy = this.toggleImportancy.bind(this);
    this.selectImportancy = this.selectImportancy.bind(this);
    this.required = this.required.bind(this);
  }

  required() {
    if (
      this.state.overskrift == "" ||
      this.state.innhold == "" ||
      this.state.bilde == "" ||
      this.state.kategori_id == "" ||
      this.state.viktighet == ""
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
    const { overskrift, innhold, bilde, kategori_id, viktighet } = this.state;
    return (
      <div>
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
            <div class="form-group">
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
                  <DropdownItem>Kultur</DropdownItem>
                  <DropdownItem>Sport</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </div>
            <div class="form-group">
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
            <button type="submit" class="btn btn-primary fa fa-save fa-custom">
              {" "}
              <a className="fa-custom">LAGRE</a>
            </button>
          </form>
        )}
        <Button
          className="bg-warning fa fa-edit fa-custom"
          onClick={this.toggleForm}
        >
          {" "}
          <a className="fa-custom">ENDRE SAK</a>
        </Button>
      </div>
    );
  }
}
function checkCategory(category: string) {
  if (category == "Kultur") return 1;
  else if (category == "Sport") return 2;
  else return null;
}

function checkImportancy(importancy: string) {
  if (importancy.length > 1) return null;
  else return importancy;
}
