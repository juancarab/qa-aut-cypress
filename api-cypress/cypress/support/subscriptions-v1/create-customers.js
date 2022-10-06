function create() {
  cy.fixture("subscriptions-v1/create-customers").then((createCustomer) => {
    const authorization = `bearer ${Cypress.env("oAauthToken")}`;
    createCustomer.bodyRequest.email = Cypress.env("username");
    cy.getAccountByName().then((user) => {
      expect(user.status).to.eq(200);
      Cypress.env("openId", user.body.openId);
      createCustomer.bodyRequest.openId = Cypress.env("openId");
      cy.log("openId: " + Cypress.env("openId"));
    });
    cy.api({
      method: "POST",
      url: "....................",
      headers: {
        authorization,
      },
      body: createCustomer.bodyRequest,
    }).then((res) => {
      return cy.wrap(res);
    });
  });
}

Cypress.Commands.add("createCustomers", () => {
  create();
});
