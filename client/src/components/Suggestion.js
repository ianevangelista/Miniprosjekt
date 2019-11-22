import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const Suggestions = props => {
  const options = props.results.map(res => (
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
        <a className="custom-search text-uppercase font-italic bg-dark dropdown-item pl-0">
          {res.overskrift}
        </a>
      </NavLink>
    </li>
  ));

  return <ul style={{ padding: "0", listStyleType: "none" }}>{options}</ul>;
};
export default Suggestions;
