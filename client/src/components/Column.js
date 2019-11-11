import React, { Component } from "react";

export default class Column extends Component<{
  width?: number,
  children?: React.Node
}> {
  render() {
    return (
      <div
        className={
          "col" +
          (this.props.width
            ? "-" + this.props.width
            : "justify-content-center align-items-center")
        }
      >
        {this.props.children}
      </div>
    );
  }
}
