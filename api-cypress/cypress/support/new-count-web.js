Cypress.Commands.add("createTokenauth0Token", () => {
  cy.fixture("login").then((login) => {
    cy.visit("...........");
    const uuid = () => Cypress._.random(0, 1e6);
    const emailIdRandom = uuid();
    const emailRandom = "..........." + emailIdRandom + "...........";
    cy.log(emailRandom);
    cy.get("#email-input").type(emailRandom);
    cy.get(".primary-button").click();
    cy.intercept({ method: "GET", url: "..........." }).as("responseRole");

    cy.get("#password-input").type("...........");
    cy.get("#confirm-password-input").type("...........");
    cy.get(".primary-button").click();

    cy.wait("@responseRole").then(({ request, response }) => {
      var bearerToken = request.headers["authorization"];

      var tokenAuth0 = bearerToken.substring(7, bearerToken.length);

      cy.log(tokenAuth0);
    });
  });
});
