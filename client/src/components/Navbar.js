import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search";
import "../styles/Navbar.css";
import { getAllCategories } from "../Service";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: []
    };
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
  render() {
    const { categories } = this.state;
    return (
      <nav
        class="navbar py-0 navbar-expand-md navbar-dark bg-primary sticky-top"
        role="navigation"
      >
        <a class="navbar-brand shadow rounded">
          <NavLink className="nav-link" exact to="">
            NTNEWS
          </NavLink>
        </a>
        <button
          class="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="nav navbar-nav">
            <li class="nav-item custom-nav-text mr-4 my-auto">
              <NavLink className="nav-link shadow rounded" exact to="">
                FORSIDE
              </NavLink>
            </li>
            <li class="nav-item custom-nav-text mr-4 my-auto">
              <NavLink className="nav-link shadow rounded" exact to="/register">
                NY SAK
              </NavLink>
            </li>
            <li class="nav-item custom-nav-text mr-4 my-auto dropdown show">
              <NavLink
                className="nav-link dropdown-toggle shadow rounded"
                exact
                to="/"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                KATEGORI
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

function getCategories(category) {
  return (
    <NavLink
      class="dropdown-item"
      onClick={() => {
        window.location.hash = "/kategori/" + category.kategori_id;
        window.location.reload();
      }}
      exact
      to={"/kategori/" + category.kategori_id}
    >
      {category.kategori_navn}
    </NavLink>
  );
}
