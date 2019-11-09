import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Card from "./Card";

export default class News extends Component<{
  title?: string,
  src?: string,
  alt?: string,
  id?: string,
  bgColor?: string,
  lastUpdate?: timestamp
}> {
  render() {
    return (
      <Card>
        <NavLink
          className="text-body nav-link"
          exact
          to={"/sak/" + this.props.id}
        >
          <div className="col-sm-">
            <div className={"mx-auto bg-" + this.props.bgColor + " border-0"}>
              <div>
                <img
                  src={this.props.src}
                  className="img-fluid mw-100 h-auto"
                  alt={this.props.alt}
                />
              </div>
              <div className="card-body">
                <p className="h2 text-center">{this.props.title}</p>
              </div>
            </div>
            <p className="text-muted text-center mt-2">
              Skrevet: {stringifyDate(this.props.lastUpdate)}{" "}
              {stringifyTime(this.props.lastUpdate)}
            </p>
          </div>
        </NavLink>
      </Card>
    );
  }
}

function stringifyDate(date: String) {
  return date.slice(0, 10);
}

function stringifyTime(date: String) {
  return date.slice(11, 16);
}
