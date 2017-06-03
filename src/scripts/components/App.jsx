"use strict";

import React from "react"

import ExprInput from "components/ExprInput"
import Calculate from "components/Calculate"
import Rpn from "components/Rpn"
import InfixNotation from "components/visitor/InfixNotation"

import Tokenizer from "models/Tokenizer"
import Parser from "models/Parser"
import nodeFactory from "models/Node"

import InfixNotationVistor from "models/visitor/InfixNotationVisitor"

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
      </div>
    );
  }
}

