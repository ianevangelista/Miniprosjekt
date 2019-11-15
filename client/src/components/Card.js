import React, { Component } from "react";

export default class Card extends Component<{
  children?: React.Node,
  cardSize?: string
}> {
  render() {
    return (
      <div className={"card w-" + this.props.cardSize + " my-3 border-0"}>
        <div className="card-body p-0">
          <div className="m-0">{this.props.children}</div>
        </div>
      </div>
    );
  }
}
