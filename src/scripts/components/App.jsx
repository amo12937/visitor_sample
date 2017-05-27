"use strict";

import React from "react"

import ExprInput from "components/ExprInput"

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <ExprInput />
      </div>
    );
  }
}

