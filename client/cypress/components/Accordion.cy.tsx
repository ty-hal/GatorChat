import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Accordion from "../../src/components/Accordion";

describe("<Accordion />", () => {
  it("renders", () => {
    cy.mount(
      <BrowserRouter>
        <Accordion
          id={1}
          question="How do I sign up for an account?"
          answer="To sign up for an account, click on the 'Register' button on the navigation bar or the footer of the homepage. You will be prompted to enter your name, UFL email address, major, password, and an optional profile picture. Once you have submitted this information, you will receive an email to confirm your account."
          index={1}
        />
      </BrowserRouter>
    );
  });

  it("collapsed question", () => {
    cy.mount(
      <BrowserRouter>
        <Accordion
          id={1}
          question="How do I sign up for an account?"
          answer="To sign up for an account, click on the 'Register' button on the navigation bar or the footer of the homepage. You will be prompted to enter your name, UFL email address, major, password, and an optional profile picture. Once you have submitted this information, you will receive an email to confirm your account."
          index={2}
        />
      </BrowserRouter>
    );
    cy.get("#question-1").contains("How do I sign up for an account?");
    cy.get("#answer").should("not.exist");
  });

  it("expanded question", () => {
    cy.mount(
      <BrowserRouter>
        <Accordion
          id={1}
          question="How do I sign up for an account?"
          answer="To sign up for an account, click on the 'Register' button on the navigation bar or the footer of the homepage. You will be prompted to enter your name, UFL email address, major, password, and an optional profile picture. Once you have submitted this information, you will receive an email to confirm your account."
          index={1}
        />
      </BrowserRouter>
    );
    cy.get("#answer").should("exist");
  });
});
