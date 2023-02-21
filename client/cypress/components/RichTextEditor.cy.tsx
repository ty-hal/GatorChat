import React from "react";
import { BrowserRouter } from "react-router-dom";
import { RichTextEditor } from "../../src/components/RichTextEditor";

describe("<RichTextEditor />", () => {
  it("renders", () => {
    cy.mount(
      <BrowserRouter>
        <RichTextEditor />
      </BrowserRouter>
    );
  });

  it("enter text", () => {
    cy.mount(
      <BrowserRouter>
        <RichTextEditor />
      </BrowserRouter>
    );
    cy.get("#editor").type("Hi");
    cy.get("#editor").contains("Hi");
  });

  it("undo button", () => {
    cy.mount(
      <BrowserRouter>
        <RichTextEditor />
      </BrowserRouter>
    );
    cy.get("#editor").type("Hi");
    cy.get("#editor").contains("Hi");
    cy.get("#menu-bar").click(20, 20);
    cy.get("#editor").should("not.contain", "Hi");
  });

  it("character count", () => {
    cy.mount(
      <BrowserRouter>
        <RichTextEditor />
      </BrowserRouter>
    );
    cy.get("#editor").type("Hi");
    cy.get("#editor").contains("Hi");
    cy.get("#char-count").contains("2");
  });
});
