describe('contact us spec', () => {
  it('passes', () => {
    cy.visit('/contact-us')
    cy.get("#email").type("nonyabiz@ufl.edu");
    cy.get("#name").type("steven miller");
    cy.get("#message").type ("the gray fox jumped over the candle stick the gray fox jumped over the candle stick the gray fox jumped over the candle stick");
    cy.get("#submit").click();
  })
})
