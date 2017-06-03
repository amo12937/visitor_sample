"use strict";

import Lexer from "models/Lexer"

export default class Tokenizer {
  tokenize(code) {
    var chunk = code;
    var i = 0;
    var tokens = []
    while(chunk) {
      const consumed = this.numberToken(chunk, tokens) ||
        this.reservedCharToken(chunk, tokens) ||
        this.theOtherToken(chunk, tokens);
      i += consumed;
      chunk = code.slice(i);
    }

    return new Lexer(tokens);
  }

  numberToken(chunk, tokens) {
    const match = chunk.match(/^\d+/);
    if (!match) return 0;
    tokens.push({
      name: "NUMBER",
      value: Number(match[0])
    });
    return match[0].length;
  }

  reservedCharToken(chunk, tokens) {
    const name = RESERVED_CHAR_NAMES[chunk[0]];
    if (!name) return 0;
    tokens.push({
      name: name,
      value: chunk[0]
    })
    return 1;
  }

  theOtherToken(chunk, tokens) {
    const match = chunk.match(/^[^-+*\/()0-9]+/);
    if (!match) return 0;
    return match[0].length;
  }
}

const RESERVED_CHAR_NAMES = {
  "(": "PARENTHESES_OPEN",
  ")": "PARENTHESES_CLOSE",
  "+": "ADD",
  "-": "SUB",
  "*": "MUL",
  "/": "DIV"
}

const THEOTHER = /^[^-+*\/()0-9]+/;

