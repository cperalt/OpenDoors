const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Example: Modify environment variables before tests run
      on('before:browser:launch', (browser = {}, launchOptions) => {
        console.log('Launching browser:', browser.name);
        return launchOptions;
      });

      // Example: Implement custom logic to handle test failures
      on('task', {
        failed: require('cypress-failed-log/src/failed')()
      });

      // Example: Adding a listener for test retries
      on('test:after:run', (results, details) => {
        if (results.state === 'failed') {
          console.log('Test failed, attempt to retry:', results.title);
        }
      });

      // Example: Adding a listener to log test case results
      on('after:spec', (spec, results) => {
        console.log('Finished running:', spec.name);
        console.log('Results:', results);
      });

      // Return the updated config object
      return config;
    },
  },
  env: {
    // Environment variables for your tests
    baseUrl: 'http://localhost:3030',  // Example URL
    apiEndpoint: '/submit-story',     // Example API endpoint
  },
  // Additional Cypress configurations
  viewportWidth: 1280,
  viewportHeight: 720,
  retries: {
    runMode: 2,  // Number of retries when running in Cypress runner
    openMode: 0  // Number of retries when running in interactive mode
  },
});
