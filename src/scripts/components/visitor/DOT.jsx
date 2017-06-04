"use strict";

import React from "react"
import VisitorComponent from "components/visitor/Visitor"
import DOTVisitor from "models/visitor/DOTVisitor"
import Viz from "viz.js"

export default class Dot extends VisitorComponent {
  constructor(props) {
    super(props, "Tree", new DOTVisitor());
  }

  componentWillUpdate(nextProps, nextState) {
    const node = nextProps.node;
    this.currentNode = node;

    setTimeout(() => {
      if (this.currentNode != node) return;
      const dot = this.visitor.visit(node);

      const result = Viz(dot, { format: "png-image-element" });
      while (this.refs.result.firstChild) {
        this.refs.result.removeChild(this.refs.result.firstChild);
      }

      this.refs.result.appendChild(result);
    },100);
  }

  render() {
    return (
      <div className="vistor">
        <hr/>
        <div>{this.name}</div>
        <div ref="result"></div>
      </div>
    );
  }
}

