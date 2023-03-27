import "../support/commands.ts"

describe('section spec', () => 
{
  it('visit section', ()=> {
    cy.visit("/");
    cy.contains("General").click();
  })

  it('create thread', ()=> {
    cy.login("random@ufl.edu", "Mypassword@123");
    cy.visit("/");
    cy.contains("General").click();
    cy.wait(3000);
    cy.contains("Create a thread").click();
    cy.get("#title").type("Cypress Test");
    cy.get("#text").type("Cypress Text is Here ");
    cy.get("#submit").click();
    cy.contains("Cypress Test").should('exist');
  })

  it('edit thread', ()=> {
    cy.login("random@ufl.edu", "Mypassword@123");
    cy.visit("/");
    cy.contains("General").click();
    cy.wait(3000);
    cy.contains("Cypress Test").should('exist');
    cy.get("#thread-menu").click();
    cy.get("#edit").click();
    cy.get("#title-edit").click().type(" Edited");
    cy.contains("Edit thread").click();
    cy.contains("Cypress Test Edited").should('exist');
  })

  it('delete thread', ()=> {
    cy.login("random@ufl.edu", "Mypassword@123");
    cy.visit("/");
    cy.contains("General").click();
    cy.wait(3000);
    cy.contains("Cypress Test Edited").should('exist');
    cy.get("#thread-menu").click();
    cy.get("#delete").click();
    cy.get("#delete-btn").click();
    cy.contains("Cypress Test Edited").should('not.exist');
  })

})