"use strict";

import VisitorComponent from "components/visitor/Visitor"
import RPNVisitor from "models/visitor/RPNVisitor"

export default class Rpn extends VisitorComponent {
  constructor(props) {
    super(props, "Reverse Polish Notation", new RPNVisitor());
  }
}


