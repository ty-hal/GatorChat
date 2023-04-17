describe('template spec', () => 
{
  it('search for a section', () => 
  {
    cy.visit('')
    cy.get('[data-test="search-input"]').type("S")
    cy.wait(1000);
    cy.get('[data-test="search-input"]').type("ports")
    //cy.wait(1000);
    //y.get('[data-test="search-input"]').type("o")
   // cy.wait(1000);
    //cy.get('[data-test="search-input"]').type("r")
    cy.get(':nth-child(1) > .ellipsis > .block').should("contain.text","Sports")
    cy.get(':nth-child(1) > .ellipsis > .block').click();
    cy.wait(2000);
  })
  it('search for a invalid section', () => 
  {
    cy.visit('')
    cy.get('[data-test="search-input"]').type("x")
    cy.wait(1000);
    cy.get('[data-test="search-input"]').type("xxxx")
    //cy.wait(1000);
    //y.get('[data-test="search-input"]').type("o")
   // cy.wait(1000);
    //cy.get('[data-test="search-input"]').type("r")
    cy.get('.ellipsis').should("contain.text","No results");
    cy.wait(2000);
  })
})