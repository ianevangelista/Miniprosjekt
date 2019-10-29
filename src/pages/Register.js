import React, { Component } from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import axios from "axios";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overskrift: "",
      innhold: "",
      bilde: "",
      kategori_id: "",
      viktighet: ""
    };
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
    window.location.hash = "/sak";
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
            <label>Kategori</label>
            <input
              type="number"
              min="1"
              max="2"
              name="kategori_id"
              value={kategori_id}
              onChange={this.changeHandler}
              class="form-control"
              placeholder="Skriv inn kategori-id til din sak"
            ></input>
          </div>
          <div class="form-group mx-5">
            <label>Viktighet</label>
            <input
              type="number"
              min="1"
              max="2"
              name="viktighet"
              value={viktighet}
              onChange={this.changeHandler}
              class="form-control"
              placeholder="Skriv inn viktighet av din sak"
            ></input>
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
