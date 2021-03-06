// @flow
import React, { Component } from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import {
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";
import { addNews, getAllCategories } from "../Service";

export default class Register extends Component<
  {},
  {
    skribent: string,
    overskrift: string,
    ingress: string,
    innhold: string,
    bilde: string,
    kategori_id: string,
    viktighet: string,
    categories: Array<{ kategori_id: string, kategori_navn: string }>,
    dropdownOpen: boolean,
    dropdownOpenImportancy: boolean,
    valueCategory: string,
    valueImportancy: string
  }
> {
  constructor(props: any) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.toggleImportancy = this.toggleImportancy.bind(this);
    this.selectImportancy = this.selectImportancy.bind(this);
    this.required = this.required.bind(this);

    this.state = {
      skribent: "",
      overskrift: "",
      ingress: "",
      innhold: "",
      bilde: "",
      kategori_id: "",
      viktighet: "",

      categories: [],
      dropdownOpen: false,
      dropdownOpenImportancy: false,
      valueCategory: "Kategori",
      valueImportancy: "Viktighet (Høy: 1 Lav: 2)"
    };
  }

  // Henter inn alle kategorier
  componentDidMount() {
    getAllCategories()
      .then((response: any) => {
        console.log(response.data);
        this.setState({ categories: response.data });
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  // Input-validering
  required(): boolean {
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

  toggle: Function;
  select: Function;
  toggleImportancy: Function;
  selectImportancy: Function;
  required: Function;

  toggle(): void {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleImportancy(): void {
    this.setState({
      dropdownOpenImportancy: !this.state.dropdownOpenImportancy
    });
  }

  select(event: any): void {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      valueCategory: event.target.innerText
    });
    this.setState({
      kategori_id: checkCategory(event.target.innerText)
    });
  }

  selectImportancy(event: any): void {
    this.setState({
      dropdownOpenImportancy: !this.state.dropdownOpenImportancy,
      valueImportancy: event.target.innerText
    });
    this.setState({
      viktighet: event.target.innerText
    });
  }

  // Håndterer endringer i state
  changeHandler = (e: any) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Håndterer endelig innsending av ny sak
  submitHandler = (e: any) => {
    e.preventDefault();
    console.log(this.state);
    if (window.confirm("Er du sikker?")) {
      if (this.required()) {
        addNews(this.state)
          .then((response: any) => {
            console.log(response);
            alert("Saken er registrert");
            window.location.hash = "";
          })
          .catch((error: any) => {
            console.log(error);
          });
      } else {
        alert("Vennligst fyll inn alle feltene");
      }
    }
  };

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
      <div>
        <Navbar />
        <div className="jumbotron jumbotron-fluid">
          <div className="mx-5">
            <h3 className="display-4">Registrer saken din her!</h3>
            Her kan du laste opp en nyhetssak til vår nettside.
          </div>
        </div>

        <form onSubmit={this.submitHandler}>
          <div className="form-group mx-5">
            <label>Skribent:</label>
            <input
              type="text"
              name="skribent"
              value={skribent}
              onChange={this.changeHandler}
              className="form-control"
              placeholder="Navnet ditt"
            ></input>
          </div>
          <div className="form-group mx-5">
            <label>Tittel:</label>
            <input
              type="text"
              name="overskrift"
              value={overskrift}
              onChange={this.changeHandler}
              className="form-control"
              placeholder="Skriv inn tittelen til din sak"
            ></input>
          </div>
          <div className="form-group mx-5">
            <label>Ingress:</label>
            <input
              type="text"
              name="ingress"
              value={ingress}
              onChange={this.changeHandler}
              className="form-control"
              placeholder="Skriv inn ingressen til din sak"
            ></input>
          </div>
          <div className="form-group mx-5">
            <label>Beskrivelse:</label>
            <textarea
              type="text"
              name="innhold"
              className="form-control"
              value={innhold}
              onChange={this.changeHandler}
              placeholder="Skriv inn det innholdet du ønsker vist i saken"
              rows="5"
            ></textarea>
          </div>
          <div className="form-group mx-5">
            <label>Bilde-URL:</label>
            <input
              type="text"
              name="bilde"
              value={bilde}
              onChange={this.changeHandler}
              className="form-control"
              placeholder="Skriv inn bilde-URL til din sak"
            ></input>
          </div>
          <div className="row">
            <div className="form-group ml-5">
              <label className="mr-2">Velg kategori:</label>

              <ButtonDropdown
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
            <div className="form-group mx-3">
              <label className="mr-2">Velg viktighet:</label>

              <ButtonDropdown
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
            <button
              type="submit"
              className="btn btn-danger mr-5 fa fa-send fa-custom ml-auto mr-0"
            >
              {" "}
              SEND INN
            </button>
          </div>
        </form>
        <Footer />
      </div>
    );
  }
}

// Sjekker kategori
function checkCategory(category: string) {
  console.log(category.substring(0, 1));
  return category.substring(0, 1);
}

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
