import React from "react";
import { BrowserRouter } from "react-router-dom";
import ProfilePicture from "../../src/components/ProfilePicture";

describe("<ProfilePicture />", () => {
  it("renders", () => {
    cy.mount(
      <BrowserRouter>
        <ProfilePicture />
      </BrowserRouter>
    );
  });

  it("profile picture exists", () => {
    cy.mount(
      <BrowserRouter>
        <ProfilePicture />
      </BrowserRouter>
    );
    cy.get("#profilePicture").should("not.be.empty");
  });
});
