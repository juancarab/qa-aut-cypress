
/*  
These tests are for the endpints User
*/

describe('User Accounts Flow Correct', () => {

  /* Trying to create a user with an existing account */
  it('Create account', () => {
    cy.createUserWithAnExistingAccount() 
      cy.log("Create user with an existing account")
      cy.createUserWithAnExistingAccount().then((user) => {
        expect(user.status).to.eq(404)
        expect(user.body.username, 'User name correct').to.equal(Cypress.env('username'));
      })
    })
  })


