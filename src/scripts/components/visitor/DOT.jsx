"use strict";

import VisitorComponent from "components/visitor/Visitor"
import DOTVisitor from "models/visitor/DOTVisitor"

export default class Dot extends VisitorComponent {
  constructor(props) {
    super(props, "DOT Language", new DOTVisitor());
  }
}

