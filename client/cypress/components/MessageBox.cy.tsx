import React from "react";
import { BrowserRouter } from "react-router-dom";
import MessageBox from "../../src/components/MessageBox";

describe("<MessageBox />", () => {
  it("renders", () => {
    cy.mount(
      <BrowserRouter>
        <MessageBox />
      </BrowserRouter>
    );
  });

  it("enter text", () => {
    cy.mount(
      <BrowserRouter>
        <MessageBox />
      </BrowserRouter>
    );
    cy.get("#message").should("be.empty");
    cy.get("#message").type("I am just a message");
    cy.get("#message").should("not.be.empty");
  });

  it("enter emoji", () => {
    cy.mount(
      <BrowserRouter>
        <MessageBox />
      </BrowserRouter>
    );
    cy.get("#message").should("be.empty");
    cy.get("#emoji-button").click();
    cy.get("#emoji-selector").click();
    cy.get("#message").should("not.be.empty");
  });

  // TODO: enter image

  it("submit message", () => {
    cy.mount(
      <BrowserRouter>
        <MessageBox />
      </BrowserRouter>
    );
    cy.get("#message").should("be.empty");
    cy.get("#message").type("I am just a message");
    cy.get("#emoji-button").click();
    cy.get("#emoji-selector").click();
    cy.get("#message").should("not.be.empty");
    cy.get("#submit-message").click();
    cy.get("#message").should("be.empty");
  });
});
