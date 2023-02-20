import React from "react";
import { RichTextEditor } from "../../src/components/RichTextEditor";
/// <reference types="cypress" />

describe("<RichTextEditor />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RichTextEditor />);
  });
});
