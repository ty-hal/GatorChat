describe('forgot password spec', () => 
{
  //need to find a way to verify we actually got the email
  it('reset password', ()=> {
    cy.visit('/sign-in')
    cy.get("#forgot-password").click()
    cy.get("#email").type("millersteven@ufl.edu")
    cy.get("#send").click();
  })
})