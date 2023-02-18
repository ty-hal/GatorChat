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
});
