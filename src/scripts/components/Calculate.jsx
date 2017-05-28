"use strict";

import React from "react"
import CalculateVisitor from "models/visitor/CalculateVisitor"

export default class Calculate extends React.Component {
  constructor(props) {
    super(props);

    this.visitor = new CalculateVisitor();
  }
  render() {
    const node = this.props.node;
    const result = this.visitor.visit(node);
    return (
      <div className="calculate">
        {result}
      </div>
    );
  }
}


