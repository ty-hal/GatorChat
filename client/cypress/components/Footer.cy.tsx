import React from "react";
import Footer from "../../src/components/Footer";
import { BrowserRouter } from "react-router-dom";

describe("<Footer />", () => {
  it("renders", () => {
    cy.viewport(1000, 1000);
    cy.mount(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  });

  it("navigate to FAQ page", () => {
    cy.viewport(1000, 1000);
    cy.mount(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    cy.get("#faq").click();
    cy.url().should("include", "/faq");
  });

  it("navigate to contact-us page", () => {
    cy.viewport(1000, 1000);
    cy.mount(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    cy.get("#contact-us").click();
    cy.url().should("include", "/contact-us");
  });

  it("navigate to sign-in page", () => {
    cy.viewport(1000, 1000);
    cy.mount(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    cy.get("#sign-in").click();
    cy.url().should("include", "/sign-in");
  });

  it("navigate to register page", () => {
    cy.viewport(1000, 1000);
    cy.mount(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    cy.get("#register").click();
    cy.url().should("include", "/register");
  });

  it("navigate to terms-and-conditions page", () => {
    cy.viewport(1000, 1000);
    cy.mount(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    cy.get("#terms-and-conditions").click();
    cy.url().should("include", "/terms-and-conditions");
  });
});
