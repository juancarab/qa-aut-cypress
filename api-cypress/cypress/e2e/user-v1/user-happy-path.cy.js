/*  
These tests are for the endpints User
*/

describe("User Accounts Flow Correct", () => {
  /* Create account  generating a random mail */
  it("Create account", () => {
    // cy.createAccount()
  });

  /* Create token and obtain access_token */
  it("Create token and obtain access_token", () => {
    cy.log("Create token and obtain access_token");
    cy.authorize();
  });

  /* Get user account by name and verifying correct response */
  it("Get account by account-name", () => {
    cy.fixture("user-v1/create-account").then((userAccount) => {
      cy.log("Get user account name and verifying correct response");
      cy.getAccountByName().then((user) => {
        expect(user.status).to.eq(200);
        Cypress.env("accountId", user.body._id);
        Cypress.env("openId", user.body.openId);
        expect(user.body.username, "User name correct").to.equal(
          Cypress.env("username")
        );
        expect(user.body.firstName, "First name correct").to.equal(
          userAccount.bodyRequest.firstName
        );
        expect(user.body.lastName, "Last name correct").to.equal(
          userAccount.bodyRequest.lastName
        );
        expect(user.body.emails[0].address, "Email address correct").to.equal(
          Cypress.env("username")
        );
      });
    });
  });

  /* Get user account by id and verifying correct response */
  it("Get account by account-id", () => {
    cy.fixture("user-v1/create-account").then((userAccount) => {
      cy.log("Get user account by id verifying correct response");
      cy.getAccountById().then((user) => {
        expect(user.status).to.eq(200);
        expect(user.body.username, "User name correct").to.equal(
          Cypress.env("username")
        );
        expect(user.body.firstName, "First name correct").to.equal(
          userAccount.bodyRequest.firstName
        );
        expect(user.body.lastName, "Last name correct").to.equal(
          userAccount.bodyRequest.lastName
        );
        expect(user.body.emails[0].address, "Email address correct").to.equal(
          Cypress.env("username")
        );
      });
    });
  });

  /* Get user account by open id and verifying correct response */
  it("Get account by open id", () => {
    cy.fixture("user-v1/create-account").then((userAccount) => {
      cy.log("Get user account open id and verifying correct response");
      cy.getAccountOpenId().then((user) => {
        expect(user.status).to.eq(200);
        expect(user.body.username, "User name correct").to.equal(
          Cypress.env("username")
        );
        expect(user.body.firstName, "First name correct").to.equal(
          userAccount.bodyRequest.firstName
        );
        expect(user.body.lastName, "Last name correct").to.equal(
          userAccount.bodyRequest.lastName
        );
        expect(user.body.emails[0].address, "Email address correct").to.equal(
          Cypress.env("username")
        );
      });
    });
  });

  /* Check if the username is already taken*/
  it("Check if the username is already taken", () => {
    cy.checkUsernameTaken().then((user) => {
      expect(user.status).to.eq(200);
      cy.log(user.body);
    });
  });

  /* Create invitation */
  it("Create invitation", () => {
    cy.fixture("user-v1/create-invitation").then((invitation) => {
      cy.createInvitation().then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body.email, "Email address correct").to.eq(
          invitation.bodyRequest.email
        );
      });
    });
  });

  /* Updates user account by id and verify correct updates*/
  it("Update account by id", () => {
    cy.fixture("user-v1/create-account").then((userAccount) => {
      delete userAccount.bodyRequest.dataBaseRegion;
      userAccount.bodyRequest.username = Cypress.env("username");
      userAccount.bodyRequest.emails[0].address = Cypress.env("username");
      let userAccountUpdate = JSON.parse(JSON.stringify(userAccount));
      userAccountUpdate.bodyRequest.lastName = "carab2";
      cy.log("Update user account with lasName = carab2");
      cy.updateAccountById(userAccountUpdate.bodyRequest).then((update) => {
        expect(update.status).to.eq(200);
      });
      cy.log("Get user account  and verifying if lasName = Last Name Update");
      cy.getAccountById().then((userUpdated) => {
        expect(userUpdated.status).to.eq(200);
        expect(userUpdated.body.lastName).to.eq("carab2");
      });
      cy.log("Update user account with lasName = original LastName");
      cy.log(userAccount.bodyRequest.lastName);
      cy.updateAccountById(userAccount.bodyRequest).then((original) => {
        expect(original.status).to.eq(200);
      });
      cy.log("Get user account  and verifying if lasName = original LastName");
      cy.getAccountById().then((userOriginal) => {
        expect(userOriginal.status).to.eq(200);
        expect(userOriginal.body.lastName).to.eq(
          userAccount.bodyRequest.lastName
        );
      });
    });
  });

  /* Read account setting by account id*/
  it("Read account setting by account id", () => {
    cy.readAccountSettingById().then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.account, "UserId correct").to.eq(
        Cypress.env("accountId")
      );
    });
  });

  /* Updates user account setting by account id*/
  it("Updates user account setting by account id", () => {
    cy.fixture("user-v1/update-account-setting-by-account-id").then(
      (userSettingUpdate) => {
        cy.log("Update user account setting");
        cy.updateAccountSettingById(userSettingUpdate.Update).then((update) => {
          expect(update.status).to.eq(200);
        });
        cy.log("Get user account  and verifying if updated");
        cy.readAccountSettingById().then((settingUpdated) => {
          expect(settingUpdated.status).to.eq(200);
          expect(
            settingUpdated.body.communicationLanguage,
            "Communication Language correct"
          ).to.eq(userSettingUpdate.Update.communicationLanguage);
          expect(
            settingUpdated.body.preferredLanguage,
            "Preferred Language correct"
          ).to.eq(userSettingUpdate.Update.preferredLanguage);
          expect(settingUpdated.body.country, "Country Correct").to.eq(
            userSettingUpdate.Update.country
          );
          expect(settingUpdated.body.mfaMode, "MFA Mode Correct").to.eq(
            userSettingUpdate.Update.mfaMode
          );
        });
        cy.log("Update user account setting with original values");
        cy.updateAccountSettingById(userSettingUpdate.beforeUpdate).then(
          (originalSettings) => {
            expect(originalSettings.status).to.eq(200);
          }
        );
      }
    );
  });

  /* Accept agreements*/
  it("Accept agreements", () => {
    cy.fixture("user-v1/accept-agreements").then((agreements) => {
      cy.acceptAgreements(agreements).then((user) => {
        expect(user.status).to.eq(201);
        expect(user.body.account).to.eq(Cypress.env("accountId"));
      });
    });
  });

  /* List agreements */
  it("List agreements", () => {
    cy.listAgreements().then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body[0]).to.have.property("account");
    });
  });

  /* Create MFA code by account-id */
  it("Create MFA code by account-id", () => {
    cy.fixture("user-v1/create-mfa-code-by-account-id").then((mfa) => {
      cy.createMfaByAccountId(mfa).then((user) => {
        expect(user.status).to.eq(201);
      });
    });
  });

  /* Validate MFA code by account-id */
  it("Validate MFA code by account-id", () => {
    cy.validateMfaCodeById().then((res) => {
      expect(res.status).to.eq(404);
    });
  });

  /* Add a email to account */
  it("Add a email to account", () => {
    cy.fixture("user-v1/add-a-email-to-account").then((secundaryEmail) => {
      const uuid = () => Cypress._.random(0, 1e6);
      const emailIdRandom = uuid();
      cy.log(secundaryEmail.address);
      secundaryEmail.address = "secundary" + emailIdRandom + "@mail.com";
      cy.log(secundaryEmail.address);
      Cypress.env("secundaryEmail", secundaryEmail.address);
      cy.addEmailAccount(secundaryEmail).then((user) => {
        expect(user.status).to.eq(201);
      });
      cy.getAccountById().then((user) => {
        expect(user.status).to.eq(200);
        cy.log(user.body.emails[user.body.emails.length - 1].address);
        expect(
          user.body.emails[user.body.emails.length - 1].address,
          "Response contain new email"
        ).to.eq(secundaryEmail.address);
      });
    });
  });

  /* Remove email from account */
  it("Remove email from account", () => {
    cy.removeEmailFromAccount(Cypress.env("secundaryEmail")).then((res) => {
      expect(
        res.body.emails[res.body.emails.length - 1].address,
        "Response contain one only email"
      ).to.eq(Cypress.env("username"));
      expect(res.status).to.eq(200);
    });
  });
});
