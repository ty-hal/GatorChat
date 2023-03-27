describe('settings spec', () => 
{
  
  it("login and change password to invalid password",()=>{
    cy.visit("/sign-in")
    cy.get("#email").type("millersteven@ufl.edu")
    cy.get("#password").type("KfkGt2J2sAwA9tg")
    cy.get("#submit").click()
    cy.wait(500)
    cy.get("#settings").click();
    cy.get("#password").type("password");
    cy.get("#confirm-password").type("password");
    cy.get("#submit").click();
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
    cy.get("#submit").click();
    cy.on("window:alert",(text)=>
    {
      expect(text).contain("passwords do not match!");
    })
  })
  
  it("login and try to change email",()=>
  {
    cy.visit("/sign-in")
    cy.get("#email").type("millersteven@ufl.edu")
    cy.get("#password").type("KfkGt2J2sAwA9tg")
    cy.get("#submit").click()
    cy.wait(500)
    cy.get("#settings").click();
    cy.get("#email").click();
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
    cy.get("#first-name").type("steven");
    cy.get("#last-name").type("miller");
    cy.get("#submit").click();
  })
  it("login and change major",()=>
  {
    cy.visit("/sign-in")
    cy.get("#email").type("millersteven@ufl.edu")
    cy.get("#password").type("KfkGt2J2sAwA9tg")
    cy.get("#submit").click()
    cy.wait(500)
    cy.get("#settings").click();
    cy.get("#major").select("Advertising")
    cy.get("#submit").click();
  })
})