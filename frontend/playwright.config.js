import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",   
  reporter: [["html", { outputFolder: "playwright-report" }]], 
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
    screenshot: "on",   // capture screenshots for ALL tests
    video: "off"        // disable video recording
  }
});
