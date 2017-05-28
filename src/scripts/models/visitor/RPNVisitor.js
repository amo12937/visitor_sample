"use strict";

export default class RPNVisitor {
  visit(node) {
    return node.accept(this, []).join(" ");
  }

  visitLeafNode(node, s) {
    s.push(node.value());
    return s;
  }

  visitInnerNode(node, s) {
    s = node.left().accept(this, s);
    s = node.right().accept(this, s);
    s.push(node.value());
    return s;
  }
}

