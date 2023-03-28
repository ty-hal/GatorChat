import "../support/commands.ts"

describe('thread spec', () => 
{
  it('create thread', ()=> {
    cy.login("random@ufl.edu", "Mypassword@123");
    cy.visit("/");
    cy.contains("General").click();
    cy.wait(3000);
    cy.contains("Create a thread").click();
    cy.get("#title").type("Cypress Test");
    cy.get("#text").type("Cypress Text is Here");
    cy.get("#submit").click();
    cy.contains("Cypress Test").should('exist');
  })


  it('edit thread', ()=> {
    cy.login("random@ufl.edu", "Mypassword@123");
    cy.visit("/");
    cy.contains("General").click();
    cy.wait(3000);
    cy.contains("Cypress Test").click();
    cy.wait(3000);
    cy.get("#thread-menu").click();
    cy.get("#edit").click();
    cy.get("#title-edit").click().type(" Edited");
    cy.contains("Edit thread").click();
    cy.contains("Cypress Test Edited").should('exist');
  })

  it('like thread', ()=> {
    cy.login("random@ufl.edu", "Mypassword@123");
    cy.visit("/");
    cy.contains("General").click();
    cy.wait(3000);
    cy.contains("Cypress Test Edited").click();
    cy.wait(3000);
    cy.get("#num-likes").contains("0");
    cy.get("#like-button").click();
    cy.get("#num-likes").contains("1");
    cy.contains("Cypress Test Edited").should('exist');
  })

  it('reply to thread', ()=> {
    cy.login("random@ufl.edu", "Mypassword@123");
    cy.visit("/");
    cy.contains("General").click();
    cy.wait(3000);
    cy.contains("Cypress Test Edited").click();
    cy.wait(3000);
    cy.get("#message-placeholder").click();
    cy.get("#text").type("Cypress message");
    cy.get("#submit-message").click();
    cy.wait(3000);
    cy.contains("Cypress message").should('exist');
  })

  it('delete reply', ()=> {
    cy.login("random@ufl.edu", "Mypassword@123");
    cy.visit("/");
    cy.contains("General").click();
    cy.wait(3000);
    cy.contains("Cypress Test Edited").click();
    cy.wait(3000);
    cy.get("#message-menu").click();
    cy.get("#delete").click();
    cy.get("#delete-btn").click();
    cy.contains("Cypress message").should('not.exist');
  })


  it('delete thread', ()=> {
    cy.login("random@ufl.edu", "Mypassword@123");
    cy.visit("/");
    cy.contains("General").click();
    cy.wait(3000);
    cy.contains("Cypress Test Edited").should('exist');
    cy.contains("Cypress Test Edited").click();
    cy.wait(3000);
    cy.get("#thread-menu").click();
    cy.get("#delete").click();
    cy.get("#delete-btn").click();
    cy.contains("Cypress Test Edited").should('not.exist');
  })
})