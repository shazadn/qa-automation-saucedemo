import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { errorMessages, testUser } from "../utils/testData";

test.describe("Login Page Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    loginPage = new LoginPage(page);

    // Navigate to login page
    await loginPage.goto();
  });

  test("user can successfully login", async ({ page }) => {
    //Log in using the correct credentials
    await loginPage.login(testUser.username, testUser.password);

    // Verify the URL should be inventory page
    await expect(page).toHaveURL(/inventory/);

    //Verfiy we can see the inventory page title ("Product")
    await expect(page.locator('[data-test="title"]')).toHaveText("Products");
  });

  test("failed login shows error", async ({ page }) => {
    //Log in using incorrect credentials
    await loginPage.login("incorrect username", "incorrect password");

    // Verify the error message is visible ("Epic sadface: Username and password do not match any user in this service")
    await expect(await loginPage.getErrorMessage()).toHaveText(
      errorMessages.invalidLogin,
    );
  });
});
