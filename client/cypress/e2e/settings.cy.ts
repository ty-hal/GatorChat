describe('settings spec', () => 
{
  //good enough
  it("login first",()=>{
    cy.visit("/sign-in")
    cy.get("#email").type("millersteven@ufl.edu")
    cy.get("#password").type("KfkGt2J2sAwA9tg")
    cy.get("#submit").click()
    cy.wait(500)
  })
  //invalid password
  it('try to change password to invalid password', () => {
    cy.visit('/settings')
    cy.get("#first-name").type("Steven")
    cy.get("#last-name").type("Miller")
    cy.get("#password").type("password")
    cy.get("#confirm-password").type("password")
    cy.get("#submit").click()
  })

  //valid password
  it('change password to valid password', ()=> {
    cy.visit('/settings')
    cy.get("#first-name").type("Steven")
    cy.get("#last-name").type("Miller")
    cy.get("#password").type("Password1!")
    cy.get("#confirm-password").type("Password1!")
    cy.get("#submit").click()
  })
})