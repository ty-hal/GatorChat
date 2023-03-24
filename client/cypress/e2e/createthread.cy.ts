describe('template spec', () => 
{
  //need to find a way to verify we actually got the email
  it('create a thread', ()=> {
    cy.visit("general/1");
    //no idea what button to click
    //console.log(Id)
    cy.get("#create-a-thread").click();
  })
})