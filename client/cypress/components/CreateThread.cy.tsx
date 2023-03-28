import React from "react";
import { BrowserRouter } from "react-router-dom";
import CreateThread from "../../src/components/Thread/CreateThread";
import "../support/commands.ts";

describe("<CreateThread />", () => {
  it("renders", () => {
    cy.mount(
      <BrowserRouter>
        <CreateThread section_id={1} loaded={true} />
      </BrowserRouter>
    );
  });

  // it("open create thread", () => {
  //   cy.mount(
  //     <BrowserRouter>
  //       <CreateThread section_id={1} loaded={true} />
  //     </BrowserRouter>
  //   );
  //   cy.contains("Title").should("not.exist");
  //   cy.get("#create-a-thread").click();
  //   cy.get("#title").should("exist");
  // });

  // it("minimize create thread", () => {
  //   cy.mount(
  //     <BrowserRouter>
  //       <CreateThread section_id={1} loaded={true} />
  //     </BrowserRouter>
  //   );
  //   cy.get("#create-a-thread").click();
  //   cy.get("#title").should("exist");
  //   cy.get("#create-a-thread").click();
  //   cy.get("#title").should("not.exist");
  // });

  // it("create a thread", () => {
  //   cy.mount(
  //     <BrowserRouter>
  //       <CreateThread section_id={1} loaded={true} />
  //     </BrowserRouter>
  //   );
  //   cy.get("#create-a-thread").click();
  //   cy.get("#title").type("hello");
  //   cy.get("#title-length").contains("5");
  //   cy.get("#text").type("Hi");
  //   cy.get("#text").contains("Hi");
  //   cy.get("#submit").should("be.visible");
  // });

  // it("thread title over 300 chars", () => {
  //   cy.mount(
  //     <BrowserRouter>
  //       <CreateThread section_id={1} loaded={true} />
  //     </BrowserRouter>
  //   );
  //   cy.get("#create-a-thread").click();
  //   cy.get("#title").type(
  //     "  llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll"
  //   );
  //   cy.get("#title-length").contains("300/300");
  // });
});
