describe('register spec', () => {
  it('successfully register account', () => {
    cy.visit('/register')
    cy.get('#first-name').type("John");
    cy.get('#last-name').type("Doe");
    cy.get('#email').type("Johndoe@ufl.edu");
    cy.get('#majors-select').click();
    cy.get('#majors-select').click(80, 175);
    cy.get('#majors-select').click();
    cy.get('#password').type("JohnPassword1");
    cy.get('#confirm-password').type("JohnPassword1");
    cy.get('#terms').click();
    cy.get('#create-an-account').click();
    // FIGURE OUT HOW TO DELETE USER BEFORE THIS RUNS
    // cy.url().should('not.include', '/register');
  })

  it('try to register an existing account', () => {
    cy.visit('/register')
    cy.get('#first-name').type("Random");
    cy.get('#last-name').type("Random");
    cy.get('#email').type("random@ufl.edu");
    cy.get('#majors-select').click();
    cy.get('#majors-select').click(80, 175);
    cy.get('#majors-select').click();
    cy.get('#password').type("Mypassword@123");
    cy.get('#confirm-password').type("Mypassword@123");
    cy.get('#terms').click();
    cy.get('#create-an-account').click();
    cy.url().should('include', '/register');
  })

  it('try to register before entering all information', () => {
    cy.visit('/register')
    cy.get('#first-name').type("Random");
    cy.get('#create-an-account').should('be.disabled');
    cy.get('#last-name').type("Doe");
    cy.get('#create-an-account').should('be.disabled');
    cy.get('#email').type("Johndoe@ufl.edu");
    cy.get('#create-an-account').should('be.disabled');
    cy.get('#majors-select').click();
    cy.get('#majors-select').click(80, 175);
    cy.get('#majors-select').click();
    cy.get('#create-an-account').should('be.disabled');
    cy.get('#password').type("JohnPassword1");
    cy.get('#create-an-account').should('be.disabled');
    cy.get('#confirm-password').type("JohnPassword1");
    cy.get('#create-an-account').should('not.be.disabled');
    cy.get('#terms').then($el => ($el[0] as HTMLInputElement).checkValidity()).should('be.false')
    cy.get('#terms').click();
    // cy.url().should('not.include', '/register');
  })

})