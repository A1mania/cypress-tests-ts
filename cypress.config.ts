import { defineConfig } from "cypress";
import allureWriter from "@shelex/cypress-allure-plugin/writer";

export default defineConfig({
  e2e: {
     setupNodeEvents(on, config) {
     allureWriter(on, config);
      return config;
  },
    video: true,
    screenshotOnRunFailure: true,
  },
});

