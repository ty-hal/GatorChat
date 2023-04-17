describe('save a section', () =>
{
  it('save a section and unsave', ()=> {
    cy.visit('')
    cy.get('.absolute > [href="/sign-in"] > #sign-in').click();
    cy.get("#email").type("millersteven@ufl.edu");
    cy.get("#password").type("KfkGt2J2sAwA9tg");
    cy.get("#submit").click();
    cy.wait(1000);
    cy.get('.mt-2 > :nth-child(1) > .text-lg').click();
    cy.get("#bookmark-section").click();
    cy.get("#bookmark-section").should("be.true");
    cy.get('#logo').click();
  })
  
  it('save a subsection', ()=> {
    cy.visit('')
    cy.get('.absolute > [href="/sign-in"] > #sign-in').click();
    cy.get("#email").type("millersteven@ufl.edu");
    cy.get("#password").type("KfkGt2J2sAwA9tg");
    cy.get("#submit").click();
    cy.wait(2000);
    cy.get('.mt-2 > :nth-child(2)').click();
    cy.get('.sm\:grid > :nth-child(1)').click();
    cy.get("#bookmark-section").click();
    cy.get('#logo').click();
  })
})
 