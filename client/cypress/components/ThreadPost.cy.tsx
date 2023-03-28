import React from "react";
import { BrowserRouter } from "react-router-dom";
import ThreadPost from "../../src/components/Thread/ThreadPost";

describe("<ThreadPost />", () => {
  it("renders", () => {
    cy.mount(
      <BrowserRouter>
        <ThreadPost
          id={1}
          username="John Doe"
          threadTitle="Test title"
          threadContent="My thread was nothing more than this"
          threadDate="2023-02-12 00:00:00+00"
          likesCount={123}
          messagesCount={4}
        />{" "}
      </BrowserRouter>
    );
  });

  it("default profile picture exists", () => {
    cy.mount(
      <BrowserRouter>
        <ThreadPost
          id={1}
          username="John Doe"
          threadTitle="Test title"
          threadContent="My thread was nothing more than this"
          threadDate="2023-02-12 00:00:00+00"
          likesCount={123}
          messagesCount={4}
        />
      </BrowserRouter>
    );
    cy.get("#profile-picture").should("not.be.empty");
  });

  it("thread time posted relative to current time", () => {
    cy.mount(
      <BrowserRouter>
        <ThreadPost
          id={1}
          username="John Doe"
          threadTitle="Test title"
          threadContent="My thread was nothing more than this"
          threadDate="2023-02-12 00:00:00+00"
          likesCount={123}
          messagesCount={4}
        />
      </BrowserRouter>
    );
    cy.get("#post-time").should("not.contain", "NaN");
    cy.get("#post-time").contains("posted");
  });

  // it("add a like to the thread", () => {
  //   cy.mount(
  //     <BrowserRouter>
  //       <ThreadPost
  //         id={1}
  //         username="John Doe"
  //         threadTitle="Test title"
  //         threadContent="My thread was nothing more than this"
  //         threadDate="2023-02-12 00:00:00+00"
  //         likesCount={123}
  //         messagesCount={4}
  //       />
  //     </BrowserRouter>
  //   );
  //   cy.get("#num-likes").contains("123");
  //   cy.get("#like-button").click();
  //   cy.get("#num-likes").contains("124");
  // });
});
