// @flow
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

// Forslag av saker som blir benyttet av Search
const Suggestions = (props: {
  results: Array<{ sak_id: string, overskrift: string }>
}) => {
  const options: any = props.results.map(res => (
    <li>
      <NavLink
        key={res.sak_id}
        onMouseDown={() => {
          window.location.hash = "/sak/" + res.sak_id;
          window.location.reload();
        }}
        exact
        to={"/sak/" + res.sak_id}
      >
        <a
          className="custom-search px-1 text-uppercase font-italic bg-dark dropdown-item"
          aria-labelledby="dropdownMenuLink"
        >
          {res.overskrift}
        </a>
      </NavLink>
    </li>
  ));

  return (
    <ul className="position-absolute p-0" style={{ listStyleType: "none" }}>
      {options}
    </ul>
  );
};
export default Suggestions;
