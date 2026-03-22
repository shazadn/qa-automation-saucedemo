import { Page } from "@playwright/test";

// Represents the Cart Page of Sauce Demo
export class CartPage {
  constructor(private page: Page) {}

  private cartItem = ".cart_item"; //All items in the cart
  private checkoutButton = '[data-test="checkout"]'; //Button to proceed to checkout

  // Returns all items currently in the cart
  getCartItems() {
    return this.page.locator(this.cartItem);
  }

  // Remove an item from the cart by item name
  async removeItem(itemName: string) {
    await this.page.click(`[data-test="remove-${itemName}"]`);
  }

  // Click the checkout button to proceed to the checkout page
  async checkout() {
    await this.page.click(this.checkoutButton);
  }
}
