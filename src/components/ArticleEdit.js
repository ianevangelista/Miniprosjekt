import React, { Component } from "react";
import { Button } from "reactstrap";
import "../styles/stylesheet.css";
import "../styles/Article.css";
import axios from "axios";
import {
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";
import { createHashHistory } from "history";
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
    console.log(this.state);
    if (this.required()) {
      axios
        .put("http://localhost:8000/sak/" + this.props.articleId, this.state)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      showAlert();
      window.location.reload();
    } else alert("Vennligst fyll inn alle feltene");
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
            <div class="form-group mx-5">
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
            <div class="form-group mx-5">
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
            <div class="form-group mx-5">
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
            <div class="form-group mx-5">
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
            <div class="form-group mx-5">
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
            <button type="submit" class="btn btn-primary mx-5">
              Lagre
            </button>
          </form>
        )}
        <Button className="bg-warning" onClick={this.toggleForm}>
          Endre sak
        </Button>
      </div>
    );
  }
}

function showAlert() {
  alert("Saken er endret");
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
