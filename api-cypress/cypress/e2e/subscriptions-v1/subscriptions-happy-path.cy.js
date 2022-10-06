/*  
These tests are for the endpints Subscriptions
*/

describe('User Accounts Flow Correct', () => {


  /* Create account  generating a random mail */
  it('Create account', () => {
    // cy.createAccount() 

  })


  /* Create token and obtain access_token */
  it('Create token and obtain access_token', () => {
    cy.log("Create token and obtain access_token")
    cy.authorize()
  })


  /* Create customers */
  it('Create customers ', () => {
    
    cy.getAccountByName().then((user) => {
      expect(user.status).to.eq(200)
      Cypress.env('customerId', user.body.customerId)
      Cypress.env('openId', user.body.openId)

    })

  })
  

  /* Get available customer by id */
  it('Get available customer by id', () => {
    cy.fixture('subscriptions-v1/create-customers').then((customer) => {
      cy.getAvaliableCustomerById().then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.id, 'customerId correct').to.eq(Cypress.env('customerId'))
        expect(res.body.email, 'email correct').to.eq(Cypress.env('username'))
        expect(res.body.metadata.openId, 'openId correct').to.eq(Cypress.env('openId'))
        expect(res.body.name, 'name correct').to.eq(customer.bodyRequest.name)
      })
    })
  })


  ...........
  ...........
  ...........
  ...........
  ...........

    


})