"use strict";

export default {
  createAdd: (left, right) => new AddNode(left, right),
  createSub: (left, right) => new SubNode(left, right),
  createMul: (left, right) => new MulNode(left, right),
  createDiv: (left, right) => new DivNode(left, right),
  createNumber: (number) => new NumberNode(number),
  createUnknownInner: (left, right) => new UnknownInnerNode(left, right),
  createUnknownLeaf: () => new UnknownLeafNode()
}

class Node {
  constructor(name, value) {
    this._name = name;
    this._value = value ? value : name;
  }

  name() {
    return this._name;
  }

  value() {
    return this._value;
  }

  isUnknown() {
    return false;
  }
}

class InnerNode extends Node {
  constructor(left, right, name, value) {
    super(name, value);
    this._left = left;
    this._right = right;
  }

  left() {
    return this._left;
  }

  right() {
    return this._right;
  }

  accept(visitor, s) {
    const key = "visit" + this.name();
    if (visitor[key]) return visitor[key](this, s);
    return visitor.visitInnerNode? visitor.visitInnerNode(this, s) : s;
  }
}

class LeafNode extends Node {
  accept(visitor, s) {
    const key = "visit" + this.name();
    if (visitor[key]) return visitor[key](this, s);
    return visitor.visitLeafNode? visitor.visitLeafNode(this, s) : s;
  }
}

class AddNode extends InnerNode {
  constructor(left, right) {
    super(left, right, "AddNode", "+");
  }
}

class SubNode extends InnerNode {
  constructor(left, right) {
    super(left, right, "SubNode", "-");
  }
}

class MulNode extends InnerNode {
  constructor(left, right) {
    super(left, right, "MulNode", "*");
  }
}

class DivNode extends InnerNode {
  constructor(left, right) {
    super(left, right, "DivNode", "/");
  }
}

class NumberNode extends LeafNode {
  constructor(num) {
    super("NumberNode", num);
  }
}

class UnknownInnerNode extends InnerNode {
  constructor(left, right) {
    super(left, right, "UnknownInnerNode", "?");
  }

  isUnknown() {
    return true;
  }
}

class UnknownLeafNode extends LeafNode {
  constructor() {
    super("UnknownLeafNode", "?");
  }

  isUnknown() {
    return true;
  }
}

