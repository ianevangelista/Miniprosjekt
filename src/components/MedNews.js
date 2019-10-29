import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class MedNews extends Component<{
  title?: string,
  src?: string,
  alt?: string,
  href?: string
}> {
  render() {
    return (
      <div className="col-sm-4">
        <Link className="text-body" exact to={this.props.href}>
          <div
            className="card mx-auto bg-light border-0"
            style={{ width: "auto" }}
          >
            <div>
              <img
                src={this.props.src}
                className="img-fluid"
                alt={this.props.alt}
              />
            </div>
            <div className="card-body">
              <h3 className="text-center">{this.props.title}</h3>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
