import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
    excludeSpecPattern: process.env.CI ? 'cypress/components/all.cy.tsx' : []
  },
  e2e: {
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:3000',
    excludeSpecPattern: process.env.CI ? 'cypress/e2e/all.cy.tsx' : []
  },
});
