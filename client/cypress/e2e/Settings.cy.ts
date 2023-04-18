describe('settings spec', () => 
{
  it("login and add invalid class",()=>
  {
    cy.visit("/sign-in")
    cy.get("#email").type("millersteven@ufl.edu")
    cy.get("#password").type("KfkGt2J2sAwA9tg")
    cy.get("#submit").click()
    cy.wait(500)
    cy.get("#settings").click();
    cy.get('.mt-2').click();
    cy.get('.mt-2').type("underwaterbasketweaving");
    cy.get('.mt-2').type("{enter}")
    //cy.get('.flex-none').click();
    //cy.get('.max-h-72 > :nth-child(1) > .block').click();
    //cy.get('.p-6').click();
    cy.get("#submit").should("be.disabled");
  })
  it("login and add valid class",()=>
  {
    cy.visit("/sign-in")
    cy.get("#email").type("millersteven@ufl.edu")
    cy.get("#password").type("KfkGt2J2sAwA9tg")
    cy.get("#submit").click()
    cy.wait(500)
    cy.get("#settings").click();
    cy.get('.mt-2').click();
    cy.get('.mt-2').type("CEN3031");
    cy.get('.mt-2').type("{enter}");
    //cy.get('.flex-none').click();
    //cy.get('.max-h-72 > :nth-child(1) > .block').click();
    //cy.get('.p-6').click();
    cy.get("#submit").click();
  })
  it("login and change password to invalid password",()=>{
    cy.visit("/sign-in")
    cy.get("#email").type("millersteven@ufl.edu")
    cy.get("#password").type("KfkGt2J2sAwA9tg")
    cy.get("#submit").click()
    cy.wait(500)
    cy.get("#settings").click();
    cy.get("#password").type("password");
    cy.get("#confirm-password").type("password");
    cy.get("#submit").should("be.disabled");
    cy.wait(5000);
  })
  it("login and dont confirm password",()=>
  {
    cy.visit("/sign-in")
    cy.get("#email").type("millersteven@ufl.edu")
    cy.get("#password").type("KfkGt2J2sAwA9tg")
    cy.get("#submit").click()
    cy.wait(500)
    cy.get("#settings").click();
    cy.get("#password").type("KfkGt2J2sAwA9tg");
    cy.get("#submit").should("be.disabled");
  })
  
  it("login and try to change email",()=>
  {
    cy.visit("/sign-in")
    cy.get("#email").type("millersteven@ufl.edu")
    cy.get("#password").type("KfkGt2J2sAwA9tg")
    cy.get("#submit").click()
    cy.wait(500)
    cy.get("#settings").click();
    cy.get("#email").should("be.disabled");
    cy.on("window:alert",(text)=>
    {
      expect(text).contain("Contact support if you need to change your email");
    })
  })
  it("login and change name",()=>
  {
    cy.visit("/sign-in")
    cy.get("#email").type("millersteven@ufl.edu")
    cy.get("#password").type("KfkGt2J2sAwA9tg")
    cy.get("#submit").click()
    cy.wait(500)
    cy.get("#settings").click();
    cy.get("#first-name").should("be.disabled");
    cy.get("#last-name").should("be.disabled");
  })
  it("login and change major",()=>
  {
    cy.visit("/sign-in")
    cy.get("#email").type("millersteven@ufl.edu")
    cy.get("#password").type("KfkGt2J2sAwA9tg")
    cy.get("#submit").click()
    cy.wait(500)
    cy.get("#settings").click();
    cy.get('.flex-none').click();
    cy.get('.max-h-72 > :nth-child(1) > .block').click();
    cy.get('.p-6').click();
    cy.get("#submit").click();
  })

})
