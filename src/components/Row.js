import React, { Component } from "react";

export default class Row extends Component<{
  children?: React.Node
}> {
  render() {
    return (
      <div className="row justify-content-center align-items-center m-3">
        {this.props.children}
      </div>
    );
  }
}
