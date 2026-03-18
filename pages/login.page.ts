import { Page } from "@playwright/test";

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
