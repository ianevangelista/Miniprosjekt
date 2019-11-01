import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav
        class="navbar navbar-expand-md navbar-dark nav-bg-custom sticky-top"
        role="navigation"
      >
        <a class="navbar-brand">
          <NavLink className="nav-link" exact to="">
            LOGO
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
          <ul class="nav navbar-nav mx-auto">
            <li class="nav-item custom-nav-text mr-5 my-auto">
              <NavLink className="nav-link" exact to="">
                FORSIDE
              </NavLink>
            </li>
            <li class="nav-item custom-nav-text mr-5 my-auto">
              <NavLink className="nav-link" exact to="/register">
                REGISTRER
              </NavLink>
            </li>
            <li class="nav-item custom-nav-text mr-5 my-auto dropdown show">
              <NavLink
                className="nav-link dropdown-toggle"
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
                <NavLink class="dropdown-item" exact to="/sport">
                  Sport
                </NavLink>
                <NavLink class="dropdown-item" exact to="/kultur">
                  Kultur
                </NavLink>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
