import "../support/commands.ts"

describe('section spec', () => 
{
  it('visit section', ()=> {
    cy.visit("/");
    cy.contains("General").click();
  })

  it('edit thread', ()=> 
  {
    cy.visit('')
    cy.get('.absolute > [href="/sign-in"] > #sign-in').click();
    cy.get("#email").type("millersteven@ufl.edu");
    cy.get("#password").type("KfkGt2J2sAwA9tg");
    cy.get("#submit").click();
    cy.wait(5000);
    cy.get('.mt-2 > :nth-child(1) > .text-lg').click();
    cy.wait(5000)
    cy.get(':nth-child(4) >.left-3>:nth-child(4)>#thread-menu').click();
    cy.get('#edit').click()
    cy.wait(5000);
    cy.get("#editor-content").type("this is an edit test");
    cy.get('#edit-thread').click();
    cy.wait(5000);
  })
  it('create thread', ()=> 
  {
    cy.visit('')
    cy.get('.absolute > [href="/sign-in"] > #sign-in').click();
    cy.get("#email").type("millersteven@ufl.edu");
    cy.get("#password").type("KfkGt2J2sAwA9tg");
    cy.get("#submit").click();
    cy.wait(5000);
    cy.get('.mt-2 > :nth-child(1) > .text-lg').click();
    cy.wait(5000)
    cy.get('#create-a-thread').click();
    cy.get("#title").type("This is a cypress test")
    cy.get("#editor-content").type("the quick brown fox jumped over the candlestick")
    cy.get("#submit").click();
    cy.wait(5000);
  })

  

  it('delete thread', ()=> {
    
  })

})