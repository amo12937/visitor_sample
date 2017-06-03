"use strict";

export default class Lexer {
  constructor(tokens, curr = 0) {
    this._tokens = tokens;
    this._curr = curr;
  }

  next() {
    var item = this._tokens[this._curr];
    this._curr = Math.min(this._curr + 1, this._tokens.length);
    return item;
  }

  memento() {
    return ((mem) => () => {
      this._curr = mem;
    })(this._curr);
  }
}

