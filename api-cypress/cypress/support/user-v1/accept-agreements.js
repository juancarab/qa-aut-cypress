function agreementsAccept(agreements) {
  const authorization = `bearer ${Cypress.env("oAauthToken")}`;
  cy.api({
    method: "POST",
    url: "..........." + Cypress.env("accountId") + "/agreements",
    headers: {
      authorization,
    },
    body: agreements,
  }).then((res) => {
    return cy.wrap(res);
  });
}

Cypress.Commands.add("acceptAgreements", (agreements) => {
  agreementsAccept(agreements);
});
