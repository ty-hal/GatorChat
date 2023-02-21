import React from "react";
import { BrowserRouter } from "react-router-dom";
import Settings from "../../src/pages/Settings";

/// <reference types="cypress" />

describe("<Settings/>", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <Settings/>
      </BrowserRouter>
    );
  });

  it("invalid input", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <Settings/>
      </BrowserRouter>
    );

    cy.get("#email").type("john@ufl.edu");
    cy.get("#password").type("John");
    cy.get("#submit").click();
  });

  it("valid input", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <Settings />
      </BrowserRouter>
    );

    cy.get("#email").type("random@ufl.edu");
    cy.get("#password").type("Mypassword@123");
    cy.get("#submit").click();
  });
});
