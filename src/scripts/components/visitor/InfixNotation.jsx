"use strict";

import VisitorView from "components/visitor/Visitor"
import InfixNotationVisitor from "models/visitor/InfixNotationVisitor"

export default class InfixNotation extends VisitorView {
  constructor(props) {
    super(props, "中置記法", new InfixNotationVisitor());
  }
}

