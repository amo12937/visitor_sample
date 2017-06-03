"use strict";

/*
 * S           ::= <expr>
 * expr        ::= <add_expr>
 * add_expr    ::= <add_expr> "+" <mul_expr>
 *               | <add_expr> "-" <mul_expr>
 *               | <mul_expr>
 * mul_expr    ::= <mul_expr> "*" <single_expr>
 *               | <mul_expr> "/" <single_expr>
 *               | <single_expr>
 * single_expr ::= "(" <expr> ")"
 *               | <number>
 * number      ::= \d+
 */

import NodeFactory from "models/Node"

export default class Praser {
  parse(lexer) {
    return this.parseExpr(lexer)
  }

  parseExpr(lexer) {
    return this.parseAddExpr(lexer)
  }

  parseAddExpr(lexer) {
    const rewind = lexer.memento();
    var node = this.parseMulExpr(lexer);
    var result = node;
    while(true) {
      const rewindInner = lexer.memento();
      var token = lexer.next();
      if (!token) break;
      if (token.name == "ADD") {
        node = this.parseMulExpr(lexer);
        result = NodeFactory.createAdd(result, node);
      } else if (token.name == "SUB") {
        node = this.parseMulExpr(lexer);
        result = NodeFactory.createSub(result, node);
      } else {
        rewindInner();
        node = this.parseMulExpr(lexer);
        if (node.isUnknown()) {
          rewindInner();
          break;
        }
        result = NodeFactory.createUnknownInner(result, node);
      }
    }
    return result;
  }

  parseMulExpr(lexer) {
    const rewind = lexer.memento();
    var node = this.parseSingleExpr(lexer);
    var result = node;
    while(true) {
      const rewindInner = lexer.memento();
      var token = lexer.next();
      if (!token) break;
      if (token.name == "MUL") {
        node = this.parseSingleExpr(lexer);
        result = NodeFactory.createMul(result, node);
      } else if (token.name == "DIV") {
        node = this.parseSingleExpr(lexer);
        result = NodeFactory.createDiv(result, node);
      } else {
        rewindInner();
        node = this.parseSingleExpr(lexer);
        if (node.isUnknown()) {
          rewindInner();
          break;
        }
        result = NodeFactory.createUnknownInner(result, node);
      }
    }
    return result;
  }

  parseSingleExpr(lexer) {
    return this.parseParentheses(lexer) ||
           this.parseNumber(lexer) ||
           NodeFactory.createUnknownLeaf();
  }

  parseParentheses(lexer) {
    var oRewind = lexer.memento();
    var oToken = lexer.next();
    if (!oToken) return;

    if (oToken.name != "PARENTHESES_OPEN") {
      oRewind();
      return;
    }

    var node = this.parseExpr(lexer);
    var cRewind = lexer.memento();
    var cToken = lexer.next();
    if (cToken && cToken.name != "PARENTHESES_CLOSE") {
      cRewind();
    }
    return node;
  }

  parseNumber(lexer) {
    var rewind = lexer.memento();
    var token = lexer.next();
    if (token && token.name == "NUMBER") {
      return NodeFactory.createNumber(token.value);
    } else {
      rewind();
    }
  }
}

