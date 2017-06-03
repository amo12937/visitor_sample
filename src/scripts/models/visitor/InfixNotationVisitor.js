"use strict";

export default class InfixNotationVisitor {
  visit(node) {
    return node.accept(this);
  }

  visitLeafNode(node, s) {
    return node.value();
  }

  visitInnerNode(node) {
    var l = node.left().accept(this);
    var r = node.right().accept(this);
    return "(" + l + " " + node.value() + " " + r + ")";
  }
}

