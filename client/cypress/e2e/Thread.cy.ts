import "../support/commands.ts"


describe('thread spec', () => 
{
  it('save thread', ()=> {
    cy.visit('')
    cy.get('.absolute > [href="/sign-in"] > #sign-in').click();
    cy.get("#email").type("millersteven@ufl.edu");
    cy.get("#password").type("KfkGt2J2sAwA9tg");
    cy.get("#submit").click();
    cy.wait(2000);
    cy.get('.mt-2 > :nth-child(1) > .text-lg').click();
    cy.wait(2000)
    cy.get(':nth-child(4) >.left-3>:nth-child(4)>#thread-menu').click();
    cy.get("#save").click();
    //cy.get(':nth-child(4) > .left-3 > #save').click();
    cy.wait(1000);
    cy.get('#my-account').click();
    cy.wait(1000);
    cy.get('[href="/my-account/saved-threads"] > .rounded-lg').click();
    cy.wait(1000);

  })
  it('like thread', ()=> {
    cy.visit('')
    cy.get('.absolute > [href="/sign-in"] > #sign-in').click();
    cy.get("#email").type("millersteven@ufl.edu");
    cy.get("#password").type("KfkGt2J2sAwA9tg");
    cy.get("#submit").click();
    cy.wait(5000);
    cy.get('.mt-2 > :nth-child(1) > .text-lg').click();
    cy.wait(5000)
    cy.get(':nth-child(4) > .left-3 > #like-button').click();
    cy.wait(1000);
    cy.get(':nth-child(4) > .left-3 > #like-button').click();
  })

  it('reply to thread', ()=> {
    cy.visit('')
    cy.get('.absolute > [href="/sign-in"] > #sign-in').click();
    cy.get("#email").type("millersteven@ufl.edu");
    cy.get("#password").type("KfkGt2J2sAwA9tg");
    cy.get("#submit").click();
    cy.wait(5000);
    cy.get('.mt-2 > :nth-child(1) > .text-lg').click();
    cy.wait(5000)
    cy.get(':nth-child(4) > .left-3 > #messages-count').click()
    cy.wait(5000);
    cy.get('#message-placeholder').click();
    cy.get('#editor-content').type("this is a reply to your thread")
    cy.get('#submit-message').click();
    cy.wait(5000);
  })

  it('delete reply', ()=> {
    cy.visit('')
    cy.get('.absolute > [href="/sign-in"] > #sign-in').click();
    cy.get("#email").type("millersteven@ufl.edu");
    cy.get("#password").type("KfkGt2J2sAwA9tg");
    cy.get("#submit").click();
    cy.wait(5000);
    cy.get('.mt-2 > :nth-child(1) > .text-lg').click();
    cy.wait(5000)
    cy.get(':nth-child(4) > .left-3 > #messages-count').click()
    cy.wait(5000);
    cy.get("#message-menu").click();
    cy.get("#delete").click();
    cy.get("#delete-btn").click();
  })



})