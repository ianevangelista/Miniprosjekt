// @flow
import React, { Component } from "react";
import { getComments, addComment } from "../Service";
export default class CommentForm extends Component<
  {
    articleId?: any
  },
  { brukernavn: string, kommentar: string, sak_id: any }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      brukernavn: "",
      kommentar: "",
      sak_id: this.props.articleId
    };
  }

  required() {
    if (this.state.brukernavn === "" || this.state.kommentar === "") {
      return false;
    }
    return true;
  }

  changeHandler = (e: any) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e: any) => {
    e.preventDefault();
    console.log(this.state);
    if (window.confirm("Er du sikker?")) {
      if (this.required()) {
        addComment(this.state)
          .then(response => {
            console.log(response);
            alert("Kommentaren er registrert");
            window.location.reload();
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        alert("Vennligst fyll inn alle feltene");
      }
    }
  };

  render() {
    const brukernavn: string = this.state.brukernavn;
    const kommentar: string = this.state.kommentar;
    return (
      <div class="row justify-content-center align-items-center">
        <form className="form-group mt-4" onSubmit={this.submitHandler}>
          <input
            type="text"
            name="brukernavn"
            placeholder="Brukernavn"
            value={brukernavn}
            onChange={this.changeHandler}
            className="mr-3 my-2"
          />
          <input
            type="text"
            name="kommentar"
            placeholder="Kommentar"
            value={kommentar}
            onChange={this.changeHandler}
            className="mr-3 my-2"
          />
          <button
            type="submit"
            class="btn btn-danger btn-sm fa fa-send fa-custom"
          >
            {" "}
            SEND INN
          </button>
        </form>
      </div>
    );
  }
}
