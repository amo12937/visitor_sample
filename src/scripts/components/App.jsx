"use strict";

import React from "react"

import ExprInput from "components/ExprInput"
import Calculate from "components/visitor/Calculate"
import Rpn from "components/visitor/Rpn"
import InfixNotation from "components/visitor/InfixNotation"
import PolishNotation from "components/visitor/PolishNotation"

import Tokenizer from "models/Tokenizer"
import Parser from "models/Parser"
import nodeFactory from "models/Node"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateExpr = this.updateExpr.bind(this);

    this.tokenizer = new Tokenizer();
    this.parser = new Parser();
    this.state = {node: nodeFactory.createUnknownLeaf()};
  }

  updateExpr(str) {
    const lexer = this.tokenizer.tokenize(str);
    const node = this.parser.parse(lexer);
    this.setState({node:node});
  }

  render() {
    var node = this.state.node
    return (
      <div className="app">
        <ExprInput handleChange={this.updateExpr} />
        <Calculate node={node} />
        <InfixNotation node={node} />
        <Rpn node={node} />
        <PolishNotation node={node} />
      </div>
    );
  }
}

