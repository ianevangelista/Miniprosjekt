import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Card from "./Card";
import "../styles/Article.css";
import { getRating, stringifyDate, stringifyTime } from "../Service";

export default class News extends Component<{
  title?: string,
  ingress?: string,
  src?: string,
  id?: string,
  bgColor?: string,
  written?: timestamp,
  lastUpdate?: timestamp,
  cardSize?: number,
  upvotes?: number,
  downvotes?: number
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
              Sist endret: {stringifyDate(this.props.lastUpdate)}{" "}
              {stringifyTime(this.props.lastUpdate)}
            </p>
            {showRating(
              getRating(this.props.upvotes, this.props.downvotes),
              this.props.upvotes,
              this.props.downvotes
            )}
          </div>
        </NavLink>
      </Card>
    );
  }
}

function showRating(rating, up, down) {
  if (rating == null) return null;
  else {
    if (up == null) up = 0;
    if (down == null) down = 0;
    return (
      <div className="row justify-content-center align-items-center">
        <p className="fa fa-star fa-custom m-2 "> {rating}</p>
        <p className="fa fa-thumbs-up fa-custom-likes m-2"> {up}</p>
        <p className="fa fa-thumbs-down fa-custom-dislikes m-2"> {down}</p>
      </div>
    );
  }
}
