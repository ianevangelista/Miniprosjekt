import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class News extends Component<{
  title?: string,
  src?: string,
  alt?: string,
  id?: string,
  bgColor?: string
}> {
  render() {
    return (
      <div className="col-sm-">
        <NavLink
          className="text-body nav-link"
          exact
          to={"/sak/" + this.props.id}
        >
          <div
            className={"card mx-auto bg-" + this.props.bgColor + " border-0"}
            style={{ width: "auto", minHeight: "28rem" }}
          >
            <div>
              <img
                src={this.props.src}
                className="img-fluid mw-100 w-auto"
                alt={this.props.alt}
              />
            </div>
            <div className="card-body">
              <h2 className="text-center">{this.props.title}</h2>
            </div>
          </div>
        </NavLink>
      </div>
    );
  }
}
