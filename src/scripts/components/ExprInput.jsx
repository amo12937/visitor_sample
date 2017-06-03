"use strict";

import React from "react"

export default class ExprInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleChange(e.target.value);
  }

  render() {
    return (
      <div className="input">
        <input type="text" onChange={this.handleChange} />
      </div>
    );
  }
}

