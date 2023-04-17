describe('save a section', () =>
{
  it('like thread', ()=> {
    cy.visit('')
    cy.get('.absolute > [href="/sign-in"] > #sign-in').click();
    cy.get("#email").type("millersteven@ufl.edu");
    cy.get("#password").type("KfkGt2J2sAwA9tg");
    cy.get("#submit").click();
    cy.wait(1000);
    cy.get('.mt-2 > :nth-child(1) > .text-lg').click();
    cy.get("#bookmark-section").click();
    cy.get('#logo').click();
  })
})
 