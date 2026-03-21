import { Page } from "@playwright/test";

export class CartPage {
  constructor(private page: Page) {}

  private cartItem = ".cart_item";
  private checkoutButton = '[data-test="checkout"]';

  getCartItems() {
    return this.page.locator(this.cartItem);
  }

  async removeItem(itemName: string) {
    await this.page.click(`[data-test="remove-${itemName}"]`);
  }

  async checkout() {
    await this.page.click(this.checkoutButton);
  }
}
