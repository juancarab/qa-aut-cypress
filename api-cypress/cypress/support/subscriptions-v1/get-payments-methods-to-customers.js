function getPaymentsMethods() {
  const authorization = `bearer ${Cypress.env("oAauthToken")}`;
  cy.api({
    method: "GET",
    url: "................" + Cypress.env("customerId") + "/payment-methods",
    headers: {
      authorization,
    },
  }).then((res) => {
    return cy.wrap(res);
  });
}

Cypress.Commands.add("getPaymentsMethodsToCustomers", () => {
  getPaymentsMethods();
});
