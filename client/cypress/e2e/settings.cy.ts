describe('template spec', () => {
  it('passes', () => {
    cy.visit('/settings')
    cy.get("#first-name").type("steven");
    cy.get("#last-name").type("miller");
    cy.get("#email").type("nonyabiz@ufl.edu");
    cy.get("#major").select("Computer Engineering");
    cy.get("#password").type("Naughtynancy123");
    cy.get("[id=submit]").click();

  })
})