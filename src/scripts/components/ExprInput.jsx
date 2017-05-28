"use strict";

import React from "react"
import Tokenizer from "models/Tokenizer"

export default class ExprInput extends React.Component {
  constructor(props) {
    super(props);
    this.tokenizer = new Tokenizer();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log(">>>>>>>>>>>>>>>>>>>");
    console.log(e.target.value);
    const token = this.tokenizer.tokenize(e.target.value);
    console.log(token);
    console.log("<<<<<<<<<<<<<<<<<<<");
  }

  render() {
    return (
      <div className="input">
        <input type="text" onChange={this.handleChange} />
      </div>
    );
  }
}

