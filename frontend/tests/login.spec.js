import { test, expect } from "@playwright/test";

test("login with valid credentials", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Fill login form
  await page.getByTestId("login-email").fill("alice@patience.com");
  await page.getByTestId("login-password").fill("password123");
  await page.getByTestId("login-submit").click();

  // Expect appointment form to appear after login
  await expect(page.getByTestId("appointment-form")).toBeVisible();
});

test("login with invalid credentials", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.getByTestId("login-email").fill("wrong@example.com");
  await page.getByTestId("login-password").fill("badpassword");
  await page.getByTestId("login-submit").click();

  // Expect an alert or error message
  page.on("dialog", async dialog => {
    expect(dialog.message()).toContain("Login failed");
    await dialog.dismiss();
  });
});
