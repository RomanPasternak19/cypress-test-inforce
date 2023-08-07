const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    viewportWidth: 1100,
    viewportHeight: 660,
    chromeWebSecurity: false,
    retries: {
      runMode: 2,
      openMode: 1
    },
    setupNodeEvents(on, config) {

    },
  },
});
