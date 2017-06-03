"use strict";

import VisitorComponent from "components/visitor/Visitor"
import InfixNotationVisitor from "models/visitor/InfixNotationVisitor"

export default class InfixNotation extends VisitorComponent {
  constructor(props) {
    super(props, "InfixNotation", new InfixNotationVisitor());
  }
}

