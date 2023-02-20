import React from "react";
import { BrowserRouter } from "react-router-dom";
import SignIn from "../../src/pages/SignIn";

/// <reference types="cypress" />

describe("<SignIn />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
  });

  it("invalid login", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );

    cy.get("#email").type("john@ufl.edu");
    cy.get("#password").type("John");
    cy.get("#submit").click();
  });

  it("valid login", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );

    cy.get("#email").type("random@ufl.edu");
    cy.get("#password").type("Mypassword@123");
    cy.get("#submit").click();
  });
});
