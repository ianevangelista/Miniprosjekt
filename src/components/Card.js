import React, { Component } from "react";

export default class Card extends Component<{
  children?: React.Node,
  cardSize?: string
}> {
  render() {
    return (
      <div
        className={"card w-" + this.props.cardSize + " m-4 border-0"}
        style={{ minHeight: "30rem" }}
      >
        <div className="card-body">
          <div className="card-text">{this.props.children}</div>
        </div>
      </div>
    );
  }
}
