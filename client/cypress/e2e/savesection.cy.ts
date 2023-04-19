describe('save a section', () =>
{
  it('search within a section and save', () => 
  {
    cy.visit('')
    cy.get('.absolute > [href="/sign-in"] > #sign-in').click();
    cy.get("#email").type("millersteven@ufl.edu");
    cy.get("#password").type("KfkGt2J2sAwA9tg");
    cy.get("#submit").click();
    cy.wait(2000);
    cy.get('[data-test="search-input"]').type("S")
    cy.wait(1000);
    cy.get('[data-test="search-input"]').type("ports")
    cy.get(':nth-child(1) > .ellipsis > .block').should("contain.text","Sports")
    cy.get(':nth-child(1) > .ellipsis > .block').click();
    cy.wait(2000);
    cy.get('[data-test="search-input"]').type("football");
    cy.get(':nth-child(1) > .ellipsis > .block').should("contain.text","Football");
    cy.get(':nth-child(1) > .ellipsis > .block').click();
    cy.wait(2000);
    cy.get("#bookmark-section").click();
  })
  /*
  it('save a subsection', ()=> {
    cy.visit('')
    cy.get('.absolute > [href="/sign-in"] > #sign-in').click();
    cy.get("#email").type("millersteven@ufl.edu");
    cy.get("#password").type("KfkGt2J2sAwA9tg");
    cy.get("#submit").click();
    cy.wait(2000);
    cy.get('.mt-2 > :nth-child(2)').click();
    cy.wait(2000);
    cy.get('.sm\:grid > :nth-child(1)').click();
    cy.wait(2000);
    cy.get("#bookmark-section").click();
    cy.get('#logo').click();
  })
  */
  it('save a section while not signed in', ()=> {
    cy.visit('')
   // cy.get('.absolute > [href="/sign-in"] > #sign-in').click();
    //cy.get("#email").type("millersteven@ufl.edu");
    //cy.get("#password").type("KfkGt2J2sAwA9tg");
    //cy.get("#submit").click();
    //cy.wait(1000);
    cy.get('.mt-2 > :nth-child(1) > .text-lg').click();
    cy.get("#bookmark-section").click();
    cy.get('a > .inline-flex').should("be.visible");
   // cy.get("#bookmark-section").should("be.true");
    cy.get('#logo').click();
  })

  it('save a section and unsave', ()=> {
    cy.visit('')
    cy.get('.absolute > [href="/sign-in"] > #sign-in').click();
    cy.get("#email").type("millersteven@ufl.edu");
    cy.get("#password").type("KfkGt2J2sAwA9tg");
    cy.get("#submit").click();
    cy.wait(1000);
    cy.get('.mt-2 > :nth-child(1) > .text-lg').click();
    cy.get("#bookmark-section").click();
    //cy.get("#bookmark-section").should("be.true");
    cy.get('#logo').click();
  })
  

})
 