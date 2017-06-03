"use strict";

export default class CalculateVisitor {
  visit(node) {
    const s = {
      nodes: [],
      edges: [],
      next: this.counter(0)
    };
    const id = s.next();
    node.accept(this, s);
    return "strict digraph \"" + id + "\" {" +
      s.nodes.join(";") + ";" + s.edges.join(";") +
      "}";
  }

  visitLeafNode(node, s) {
    const id = s.next();
    s.nodes.push(this.makeNode(id, node.value()));
    return id;
  }

  visitInnerNode(node, s) {
    const id = s.next();
    s.nodes.push(this.makeNode(id, node.value()));
    const l = node.left().accept(this, s);
    const r = node.right().accept(this, s);
    s.edges.push(this.makeEdge(id, l));
    s.edges.push(this.makeEdge(id, r));
    return id;
  }

  counter(n) {
    return () => {
      const m = n;
      n = n + 1;
      return m;
    }
  }

  makeNode(id, label) {
    return "\"" + id + "\" [label = \"" + label + "\"]"
  }

  makeEdge(from, to) {
    return "\"" + from + "\" -> \"" + to + "\""
  }
}

