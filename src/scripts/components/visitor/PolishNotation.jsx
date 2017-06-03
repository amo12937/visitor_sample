"use strict";

import VisitorComponent from "components/visitor/Visitor"
import PolishNotationVisitor from "models/visitor/PolishNotationVisitor"

export default class PolishNotation extends VisitorComponent {
  constructor(props) {
    super(props, "Polish Notation", new PolishNotationVisitor());
  }
}

