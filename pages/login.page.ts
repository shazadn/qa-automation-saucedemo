import { Page, expect } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  // Selectors
  private usernameInput = '[data-test="username"]';
  private passwordInput = '[data-test="password"]';
  private loginButton = '[data-test="login-button"]';
  private errorMessage = ".error-message-container";

  // Navigate to login page
  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
    //Verify we have reached the expected page by asserting the page title ("Swag Labs")
    await expect(this.page).toHaveTitle(/Swag Labs/);
  }

  // Perform login
  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  // Check for login error message
  async getErrorMessage() {
    return this.page.locator(this.errorMessage);
  }
}
