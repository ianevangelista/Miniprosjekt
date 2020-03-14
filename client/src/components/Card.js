import React, { Component } from "react";

export default class Card extends Component<{
  cardSize: string,
  children?: any
}> {
  render() {
    return (
      <div className={"card w-" + this.props.cardSize + " m-3 border-0"}>
        <div className="card-body p-0">
          <div className="m-0">{this.props.children}</div>
        </div>
      </div>
    );
  }
}
