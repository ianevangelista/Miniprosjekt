import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Card from "./Card";
import "../styles/Article.css";

export default class News extends Component<{
  title?: string,
  ingress?: string,
  src?: string,
  id?: string,
  bgColor?: string,
  lastUpdate?: timestamp,
  cardSize?: number
}> {
  render() {
    return (
      <Card cardSize={this.props.cardSize}>
        <NavLink
          className="text-body nav-link p-0"
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
              <div className="card-text">
                <p className="h2 text-center mt-2 mx-3">{this.props.title}</p>
              </div>
            </div>
            <p className="text-muted text-center my-3 mx-3">
              {this.props.ingress}
            </p>
            <p className="text-muted text-center my-auto">
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
