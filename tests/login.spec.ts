import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test("successful login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  //Verify we have reached the expected page by asserting the page title ("Swag Labs")
  await expect(page).toHaveTitle(/Swag Labs/);

  //Log in using the correct credentials
  await loginPage.login("standard_user", "secret_sauce");

  // Verify the URL should be inventory page
  await expect(page).toHaveURL(/inventory/);

  //Verfiy we can see the inventory page title ("Product")
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");
});

test("failed login shows error", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  //Verify we have reached the expected page by asserting the page title ("Swag Labs")
  await expect(page).toHaveTitle(/Swag Labs/);

  //Log in using incorrect credentials
  await loginPage.login("incorrect_user", "incorrect_pass");

  // Verify the error message is visible ("Epic sadface: Username and password do not match any user in this service")
  await expect(await loginPage.getErrorMessage()).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );
});
