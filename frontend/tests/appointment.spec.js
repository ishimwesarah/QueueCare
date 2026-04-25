import { test, expect } from "@playwright/test";

test("create appointment and see it in list", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Login first
  await page.getByTestId("login-email").fill("alice@patience.com");
  await page.getByTestId("login-password").fill("password123");
  await page.getByTestId("login-submit").click();

  // Fill appointment form
  await page.getByTestId("appointment-doctor").fill("Dr. Smith");
  await page.getByTestId("appointment-date").fill("2026-05-15T10:00");
  await page.getByTestId("appointment-reason").fill("Checkup");
  await page.getByTestId("appointment-submit").click();

  // Verify appointment appears in list
  await expect(page.getByTestId("appointment-item").first()).toContainText("Dr. Smith");
});
