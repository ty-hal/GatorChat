import "../support/commands.ts"


describe('thread spec', () => 
{
  
  it('save thread and unsave thread', ()=> {
    cy.visit('')
    cy.get('.absolute > [href="/sign-in"] > #sign-in').click();
    cy.get("#email").type("millersteven@ufl.edu");
    cy.get("#password").type("KfkGt2J2sAwA9tg");
    cy.get("#submit").click();
    cy.wait(2000);
    cy.get('.mt-2 > :nth-child(1) > .text-lg').click();
    cy.wait(2000)
    cy.get(':nth-child(4) >.left-3>:nth-child(4)>#thread-menu').click();
    cy.get("#save").click();
    cy.wait(1000);
    cy.get('#my-account').click();
    cy.wait(1000);
    cy.get('[href="/my-account/saved-threads"] > .rounded-lg').click();
    cy.wait(5000);
    cy.get('#thread-menu').click();
    cy.get("#save").click();
    cy.reload();
  })
  
  it('like thread', ()=> {
    cy.visit('')
    cy.get('.absolute > [href="/sign-in"] > #sign-in').click();
    cy.get("#email").type("millersteven@ufl.edu");
    cy.get("#password").type("KfkGt2J2sAwA9tg");
    cy.get("#submit").click();
    cy.wait(5000);
    cy.get('.mt-2 > :nth-child(1) > .text-lg').click();
    cy.wait(5000)
    cy.get(':nth-child(4) > .left-3 > #like-button').click();
    cy.wait(1000);
    cy.get(':nth-child(4) > .left-3 > #like-button').click();
  })

  it('reply to thread', ()=> {
    cy.visit('')
    cy.get('.absolute > [href="/sign-in"] > #sign-in').click();
    cy.get("#email").type("millersteven@ufl.edu");
    cy.get("#password").type("KfkGt2J2sAwA9tg");
    cy.get("#submit").click();
    cy.wait(5000);
    cy.get('.mt-2 > :nth-child(1) > .text-lg').click();
    cy.wait(5000)
    cy.get(':nth-child(4) > .left-3 > #messages-count').click()
    cy.wait(5000);
    cy.get('#message-placeholder').click();
    cy.get('#editor-content').type("this is a reply to your thread")
    cy.get('#submit-message').click();
    cy.wait(5000);
  })

  it('delete reply', ()=> {
    cy.visit('')
    cy.get('.absolute > [href="/sign-in"] > #sign-in').click();
    cy.get("#email").type("millersteven@ufl.edu");
    cy.get("#password").type("KfkGt2J2sAwA9tg");
    cy.get("#submit").click();
    cy.wait(5000);
    cy.get('.mt-2 > :nth-child(1) > .text-lg').click();
    cy.wait(5000)
    cy.get(':nth-child(4) > .left-3 > #messages-count').click()
    cy.wait(5000);
    cy.get("#message-menu").click();
    cy.get("#delete").click();
    cy.get("#delete-btn").click();
  })

  it('view thread replies', ()=> {
    cy.visit('')
    cy.get('.absolute > [href="/sign-in"] > #sign-in').click();
    cy.get("#email").type("millersteven@ufl.edu");
    cy.get("#password").type("KfkGt2J2sAwA9tg");
    cy.get("#submit").click();
    cy.wait(1000);
    cy.get('#my-account').click();
    cy.wait(1000);
    cy.get('[href="/my-account/my-messages"] > .rounded-lg').click();
    cy.wait(5000);
    //cy.get('#thread-menu').click();
    //cy.get("#save").click();
    //cy.reload();
  })
  
  it('report thread', ()=> {
    cy.visit('')
    cy.get('.absolute > [href="/sign-in"] > #sign-in').click();
    cy.get("#email").type("millersteven@ufl.edu");
    cy.get("#password").type("KfkGt2J2sAwA9tg");
    cy.get("#submit").click();
    cy.wait(2000);
    cy.get('.mt-2 > :nth-child(1) > .text-lg').click();
    cy.wait(2000)
    cy.get(':nth-child(5) >.left-3>:nth-child(4)>#thread-menu').click();
    cy.get("#report").click();
    cy.get('#report-options > :nth-child(11)').click();
    cy.get('#other-input').type("terrible music taste")
    cy.get('.border-transparent').click();
    
  })
})