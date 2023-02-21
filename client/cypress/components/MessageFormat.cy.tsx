import React from "react";
import Message from "../../src/components/MessageFormat";
import { BrowserRouter } from "react-router-dom";

let props = {
  id: 1,
  username: "John Doe",
  messageContent: "My message was nothing more than this",
  messageDate: "2023-02-12 00:00:00+00",
  likesCount: 123,
};
describe("<MessageFormat />", () => {
  it("renders", () => {
    cy.mount(
      <BrowserRouter>
        <Message
          id={1}
          username="John Doe"
          messageContent="My message was nothing more than this"
          messageDate="2023-02-12 00:00:00+00"
          likesCount={123}
        />
      </BrowserRouter>
    );
  });

  it("default profile picture exists", () => {
    cy.mount(
      <BrowserRouter>
        <Message
          id={1}
          username="John Doe"
          messageContent="My message was nothing more than this"
          messageDate="2023-02-12 00:00:00+00"
          likesCount={123}
        />
      </BrowserRouter>
    );
    cy.get("#profile-picture").should("not.be.empty");
  });

  it("message time posted relative to current time", () => {
    cy.mount(
      <BrowserRouter>
        <Message
          id={1}
          username="John Doe"
          messageContent="My message was nothing more than this"
          messageDate="2023-02-12 00:00:00+00"
          likesCount={123}
        />
      </BrowserRouter>
    );
    cy.get("#post-time").should("not.contain", "NaN");
    cy.get("#post-time").contains("posted");
  });

  it("add a like to the message", () => {
    cy.mount(
      <BrowserRouter>
        <Message
          id={1}
          username="John Doe"
          messageContent="My message was nothing more than this"
          messageDate="2023-02-12 00:00:00+00"
          likesCount={123}
        />
      </BrowserRouter>
    );
    cy.get("#num-likes").contains("123");
    cy.get("#like-button").click();
    cy.get("#num-likes").contains("124");
  });

  it("dropdown menu copy message", () => {
    cy.mount(
      <BrowserRouter>
        <Message
          id={1}
          username="John Doe"
          messageContent="My message was nothing more than this"
          messageDate="2023-02-12 00:00:00+00"
          likesCount={123}
        />
      </BrowserRouter>
    );
    cy.get("#dropdown-button").click();
    cy.get("#copy").realClick();
  });
});
