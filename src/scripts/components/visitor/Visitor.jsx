"use strict";

import React from "react"

export default class Visitor extends React.Component {
  constructor(props, name, visitor) {
    super(props);
    this.name = name;
    this.visitor = visitor;
  }

  render() {
    const node = this.props.node;
    const result = this.visitor.visit(node);

    return (
      <div className="vistor">
        <hr/>
        <div>{this.name}</div>
        <div>{result}</div>
      </div>
    );
  }
}


