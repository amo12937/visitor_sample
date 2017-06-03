"use strict";

export default class CalculateVisitor {
  visit(node) {
    const result = node.accept(this, null);
    return result == null ? "?" : result;
  }

  visitNumberNode(node, _) {
    return node.value();
  }

  visitInnerNode(node, s, f) {
    if (f == null) return null;
    const l = node.left().accept(this);
    if (l == null) return null;
    const r = node.right().accept(this);
    if (r == null) return null;
    return f(l, r);
  }

  visitAddNode(node, _) {
    return this.visitInnerNode(node, _, (l, r) => l + r);
  }

  visitSubNode(node, _) {
    return this.visitInnerNode(node, _, (l, r) => l - r);
  }

  visitMulNode(node, _) {
    return this.visitInnerNode(node, _, (l, r) => l * r);
  }

  visitDivNode(node, _) {
    return this.visitInnerNode(node, _, (l, r) => r == 0 ? null : l / r );
  }

  visitUnknownInnerNode() {
    return null;
  }

  visitUnknownLeafNode() {
    return null;
  }
}

