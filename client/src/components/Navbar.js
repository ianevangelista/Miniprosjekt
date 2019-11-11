import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search";
import "../styles/Navbar.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav
        class="navbar navbar-expand-md navbar-dark bg-primary sticky-top"
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
                to="/sport"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                KATEGORI
              </NavLink>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <NavLink class="dropdown-item" exact to="/kategori/1">
                  Kultur
                </NavLink>
                <NavLink class="dropdown-item" exact to="/kategori/2">
                  Sport
                </NavLink>
              </div>
            </li>
          </ul>
          <Search />
        </div>
      </nav>
    );
  }
}
