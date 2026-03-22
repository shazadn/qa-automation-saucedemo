import { Page } from "@playwright/test";

// Represents the Checkout Page of Sauce Demo
export class CheckoutPage {
  constructor(private page: Page) {}

  // Selectors
  private firstName = '[data-test="firstName"]'; //First name input field
  private lastName = '[data-test="lastName"]'; //Last name input field
  private postalCode = '[data-test="postalCode"]'; //Postal code input field
  private continueButton = '[data-test="continue"]'; //Continue button to proceed after filling input form
  private finishButton = '[data-test="finish"]'; //Finish button to complete order
  private successMessage = ".complete-header"; //Text shown after successful order

  // Return success message after a successful order
  getSuccessMessage() {
    return this.page.locator(this.successMessage);
  }

  // Fill checkout form with provided user details and proceed to the order summary
  async fillCheckoutForm(first: string, last: string, zip: string) {
    await this.page.fill(this.firstName, first);
    await this.page.fill(this.lastName, last);
    await this.page.fill(this.postalCode, zip);
    await this.page.click(this.continueButton);
  }

  // Click the finish button to complete order
  async finishOrder() {
    await this.page.locator(this.finishButton).click();
  }
}
