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

type State = {
  skribent: string,
  overskrift: string,
  ingress: string,
  innhold: string,
  bilde: string,
  kategori_id: string,
  viktighet: string | null,
  sak_id: number,
  categories: Array<{ kategori_id: string, kategori_navn: string }>,
  showInputForm: boolean,
  dropdownOpen: boolean,
  dropdownOpenImportancy: boolean,
  valueCategory: string,
  valueImportancy: string
};

type Props = {
  articleWriter: string,
  articleId: number,
  articleTitle: string,
  articleIngress: string,
  articleContent: string,
  articleImg: string,
  articleCategory: string,
  articleCategoryId: string,
  articleImportancy: string
};

// Component for å endre en sak
export default class ArticleEdit extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      skribent: this.props.articleWriter,
      overskrift: this.props.articleTitle,
      ingress: this.props.articleIngress,
      innhold: this.props.articleContent,
      bilde: this.props.articleImg,
      kategori_id: this.props.articleCategoryId,
      viktighet: this.props.articleImportancy,
      sak_id: this.props.articleId,

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

  // Henter inn alle kategorier
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

  // Sjekker om alle inputfelt er gyldige
  required: Function;
  required() {
    if (
      this.state.skribent === "" ||
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

  // Funksjon som sender inn endret sak
  editHandler = (e: any) => {
    e.preventDefault();
    if (window.confirm("Er du sikker?")) {
      if (this.required()) {
        editNews(this.props.articleId, this.state)
          .then(response => {
            alert("Saken er endret");
            window.location.reload();
          })
          .catch(error => {
            console.log(error);
          });
      } else alert("Vennligst fyll inn alle feltene");
    }
  };

  // Endrer på state
  changeHandler = (e: any) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Viser form
  toggleForm: Function;
  toggleForm = () => {
    const showInputForm: boolean = this.state.showInputForm;
    this.setState({
      showInputForm: !this.state.showInputForm
    });
  };

  toggle: Function;
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleImportancy: Function;
  toggleImportancy() {
    this.setState({
      dropdownOpenImportancy: !this.state.dropdownOpenImportancy
    });
  }

  select: Function;
  select(event: any) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      valueCategory: event.target.innerText
    });
    this.setState({
      kategori_id: checkCategory(event.target.innerText)
    });
  }

  selectImportancy: Function;
  selectImportancy(event: any) {
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
      skribent,
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
              <label>Skribent:</label>
              <input
                type="text"
                name="skribent"
                value={skribent}
                onChange={this.changeHandler}
                class="form-control"
                placeholder="Ditt navn"
              ></input>
            </div>
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
                <label>Velg kategori:</label>
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
                <label>Velg viktighet:</label>
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
              <div className="ml-auto mr-0">
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

// Returnerer kategori
function checkCategory(category: string) {
  return category.substring(0, 1);
}

// Viser alle kategoriene
function getCategories(category: {
  kategori_id: string,
  kategori_navn: string
}) {
  return (
    <DropdownItem>
      {category.kategori_id}. {category.kategori_navn}
    </DropdownItem>
  );
}

// Sjekker viktighet
function checkImportancy(importancy: any) {
  if (importancy.length > 1) return null;
  else return importancy;
}
