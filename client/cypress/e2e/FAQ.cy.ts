describe('FAQ spec', () => 
{
    it('passes', () => {
      cy.visit('')
      cy.get('#faq').click();
      for(let i =1; i <11; i++)
      {
        //cy.get('.h-auto > :nth-child(${i})').click();
      }
      cy.get('.flex-col > :nth-child(1)').click();
      //cy.get('.flex-col > :nth-child(2)').click();
      cy.get('.flex-col > :nth-child(2)')
      cy.get('.flex-col > :nth-child(4)')
      //cy.get('.h-auto > :nth-child(1)').click();
      //cy.get('.h-auto > :nth-child(2)').click();
      //cy.get('.h-auto > :nth-child(3)').click();
    })
  })
  