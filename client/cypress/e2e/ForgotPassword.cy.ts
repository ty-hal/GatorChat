describe('resetting password with incorrect code', () => 
{
  
  it('reset password', ()=> {
    cy.visit('/sign-in')
    cy.get("#forgot-password").click()
    cy.get("#email").type("millersteven@ufl.edu")
    //cy.get("#send-email").click();
    //cy.wait(10000);
    cy.get("#code").type("000000");
    cy.get("#password").type("Miller0403");
    cy.get("#check").click();
  })
})
describe('resetting password without password', () => 
{
  
  it('reset password', ()=> {
    cy.visit('/sign-in')
    cy.get("#forgot-password").click()
    cy.get("#email").type("millersteven@ufl.edu")
    //cy.get("#send-email").click();
    //cy.wait(10000);
    cy.get("#code").type("000000");
    //cy.get("#password").type("Miller0403");
    cy.get("#check").click();
  })
})

