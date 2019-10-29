import React, { Component } from "react";
import { Link } from "react-router-dom";
import Sak from "./Sak";

export default class News extends Component<{
  title?: string,
  src?: string,
  alt?: string,
  href?: string
}> {
  render() {
    return (
      <div className="col-sm-">
        <Link className="text-body" exact to={this.props.href}>
          <div
            className="card mx-auto bg-danger border-0"
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
        </Link>
      </div>
    );
  }
}
