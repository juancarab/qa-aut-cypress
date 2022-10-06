
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 60000,
  env: {
    ...........
    ...........
    ...........
    ...........

    CYPRESS_API_MESSAGES: true,
    CYPRESS_API_SHOW_CREDENTIALS: false,
    
  },

  e2e: {
    setupNodeEvents(on, config) {
      return config;
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:8080'
    
  },
});


