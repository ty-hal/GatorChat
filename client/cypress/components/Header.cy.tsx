import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "../../src/components/Header";
import "../support/commands.ts";

describe("<Header />", () => {
  it("renders", () => {
    cy.mount(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  });

  it("click logo", () => {
    cy.mount(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    cy.get("#logo").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("navigate to home page", () => {
    cy.mount(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    cy.get("#home").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("navigate to sign-in page", () => {
    cy.mount(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    cy.get("#sign-in").click();
    cy.url().should("include", "/sign-in");
  });

  it("navigate to register page", () => {
    cy.mount(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    cy.get("#register").click();
    cy.url().should("include", "/register");
  });

  it("toggle dark/light mode", () => {
    cy.mount(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    cy.get("#menu-button").click();
    cy.get("#theme").click();
    cy.window()
      .its("localStorage")
      .invoke("getItem", "dark-mode")
      .should("eq", "false");
    cy.get("#menu-button").click();
    cy.get("#theme").click();
    cy.window()
      .its("localStorage")
      .invoke("getItem", "dark-mode")
      .should("eq", "true");
  });
});
