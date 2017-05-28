"use strict";

import React from "react"
import RPNVisitor from "models/visitor/RPNVisitor"

export default class Rpn extends React.Component {
  constructor(props) {
    super(props);

    this.visitor = new RPNVisitor();
  }
  render() {
    const node = this.props.node;
    const result = this.visitor.visit(node);
    return (
      <div className="rpn">
        {result}
      </div>
    );
  }
}


