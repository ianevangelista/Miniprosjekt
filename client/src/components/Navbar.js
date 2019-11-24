// @flow
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search";
import "../styles/Navbar.css";
import { getAllCategories } from "../Service";

export default class Navbar extends Component<
  {},
  { categories: Array<{ kategori_id: number, kategori_navn: string }> }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      categories: []
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
  render() {
    const categories: Array<{
      kategori_id: number,
      kategori_navn: string
    }> = this.state.categories;
    return (
      <nav
        className="navbar py-0 navbar-expand-lg navbar-dark bg-primary sticky-top"
        role="navigation"
      >
        <a className="navbar-brand">
          <NavLink className="nav-link" exact to="/">
            NTNEWS
          </NavLink>
        </a>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="nav navbar-nav">
            <li className="nav-item custom-nav-text mr-4 my-auto">
              <NavLink className="nav-link" exact to="/">
                <a>FORSIDE</a>
              </NavLink>
            </li>
            <li className="nav-item custom-nav-text mr-4 my-auto">
              <NavLink className="nav-link" exact to="/register">
                <a>NY SAK</a>
              </NavLink>
            </li>
            <li className="nav-item custom-nav-text mr-4 my-auto dropdown show">
              <NavLink
                className="nav-link dropdown-toggle"
                exact
                to="/sak"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <a>KATEGORI</a>
              </NavLink>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                {categories.map(cat => getCategories(cat))}
              </div>
            </li>
          </ul>
          <Search />
        </div>
      </nav>
    );
  }
}

// Lister kategoriene som er hentet til linker som er drop-down items
function getCategories(props: { kategori_id: number, kategori_navn: string }) {
  return (
    <NavLink
      className="dropdown-item"
      onClick={() => {
        window.location.hash = "/kategori/" + props.kategori_id;
        window.location.reload();
      }}
      exact
      to={"/kategori/" + props.kategori_id}
    >
      {props.kategori_navn}
    </NavLink>
  );
}
