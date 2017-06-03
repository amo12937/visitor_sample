"use strict";

import VisitorComponent from "components/visitor/Visitor"
import CalculateVisitor from "models/visitor/CalculateVisitor"

export default class Calculate extends VisitorComponent {
  constructor(props) {
    super(props, "Answer", new CalculateVisitor());
  }
}

