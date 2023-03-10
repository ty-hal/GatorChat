import React from "react";
import { BrowserRouter } from "react-router-dom";
import MessageBox from "../../src/components/Message/MessageBox";

describe("<MessageBox />", () => {
  it("renders", () => {
    cy.mount(
      <BrowserRouter>
        <MessageBox thread_id={1} />
      </BrowserRouter>
    );
  });

  it("enter text", () => {
    cy.mount(
      <BrowserRouter>
        <MessageBox thread_id={1} />
      </BrowserRouter>
    );
    cy.get("#message-placeholder").click();
    cy.get("#text").click();
    cy.get("#text").type("I am just a text");
    cy.get("#text").should("not.be.empty");
  });

  // it("enter emoji", () => {
  //   cy.mount(
  //     <BrowserRouter>
  //       <MessageBox thread_id={1} />
  //     </BrowserRouter>
  //   );
  //   cy.get("#message").should("be.empty");
  //   cy.get("#emoji-button").click();
  //   cy.get("#emoji-selector").click();
  //   cy.get("#message").should("not.be.empty");
  // });

  // // TODO: enter image

  it("submit message", () => {
    cy.mount(
      <BrowserRouter>
        <MessageBox thread_id={1} />
      </BrowserRouter>
    );
    cy.get("#message-placeholder").click();
    cy.get("#text").click();
    cy.get("#text").type("I am just a text");
    cy.get("#text").should("not.be.empty");
    cy.get("#submit-message").click();
  });
});
