"use strict";

import React from "react"

import ExprInput from "components/ExprInput"
import Calculate from "components/Calculate"
import Rpn from "components/Rpn"

import nodeFactory from "models/Node"

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var node = nodeFactory.createAdd(
      nodeFactory.createNumber(1),
      nodeFactory.createMul(
        nodeFactory.createNumber(2),
        nodeFactory.createNumber(3)
      )
    );
    return (
      <div className="app">
        <ExprInput />
        <Calculate node={node} />
        <Rpn node={node} />
      </div>
    );
  }
}

