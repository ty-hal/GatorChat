describe('template spec', () => 
{
  it('create a thread', ()=> {
    cy.visit("/sign-in");
    cy.get("#email").type("millersteven@ufl.edu");
    cy.get("#password").type("KfkGt2J2sAwA9tg");
    cy.get("#submit").click();
    cy.get(".mx-auto.w-full > :nth-child(1) > a > .cursor-pointer").click();
    cy.wait(500);
    cy.get("#create-a-thread").click();
    cy.get("#create-a-thread").click();
    cy.get("#title").type("thread test");
    //cy.get("#editor-content").type("the grey fox jumped over the candlestick");
    //cy.get("#submit").click();

   
  })
})