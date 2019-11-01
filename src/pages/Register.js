import React, { Component } from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import axios from "axios";
import {
  Container,
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.toggleImportancy = this.toggleImportancy.bind(this);
    this.selectImportancy = this.selectImportancy.bind(this);

    this.state = {
      overskrift: "",
      innhold: "",
      bilde: "",
      kategori_id: "",
      viktighet: "",

      dropdownOpen: false,
      dropdownOpenImportancy: false,
      valueCategory: "Kategori",
      dropdownOpenImportancy: false,
      valueImportancy: "Viktighet (Høy: 1 Lav: 2)"
    };
  }

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
      viktighet: event.target.innerText
    });
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    axios
      .post("http://localhost:8000/registrerSak", this.state)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    showAlert();
    window.location.hash = "";
  };

  render() {
    const { overskrift, innhold, bilde, kategori_id, viktighet } = this.state;
    return (
      <div>
        <Navbar />
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4">Registrer en sak!</h1>
            <p class="lead">
              Her kan du laste opp en nyhetssak til vår nettside.
            </p>
          </div>
        </div>

        <form onSubmit={this.submitHandler}>
          <div class="form-group mx-5">
            <label>Tittel</label>
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
            <label>Beskrivelse</label>
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
            <label>Bilde-URL</label>
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
            <ButtonDropdown
              isOpen={this.state.dropdownOpen}
              toggle={this.toggle}
            >
              <DropdownToggle>{this.state.valueCategory}</DropdownToggle>
              <DropdownMenu onClick={this.select} onChange={this.changeHandler}>
                <DropdownItem>Kultur</DropdownItem>
                <DropdownItem>Sport</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
          <div class="form-group mx-5">
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

          <button type="submit" class="btn btn-primary mx-5">
            Submit
          </button>
        </form>
        <Footer />
      </div>
    );
  }
}
function showAlert() {
  alert("Saken er registrert");
}

function checkCategory(category: string) {
  if (category == "Kultur") return 1;
  else if (category == "Sport") return 2;
  else return null;
}
