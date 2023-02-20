describe('template spec', () => {
  it('unsuccessful login', () => {
    cy.visit('/sign-in')
    cy.get("#email").type("random@ufl.edu");
    cy.get("#password").type("3Mypassword@123");
    cy.get("#submit").click();
    cy.url().should('eq', 'http://localhost:3000/sign-in');
  })

  it('successful login', () => {
    cy.visit('/sign-in')
    cy.get("#email").type("random@ufl.edu");
    cy.get("#password").type("Mypassword@123");
    cy.get("#submit").click();
    cy.url().should('eq', 'http://localhost:3000/');
  })

  it('remember me feature', () => {
    cy.visit('/sign-in')
    cy.get("#email").type("fake@email.com");
    cy.get("#password").type("Something");
    cy.get("#remember").click();
    cy.window().its('localStorage').invoke('getItem', 'login-information').then(JSON.parse).should('deep.equal', {email: 'fake@email.com', password: 'Something', remember_me: true})

    cy.get("#remember").click();
    cy.window().its('localStorage').invoke('getItem', 'login-information').then(JSON.parse).should('deep.equal', null)

  })
})