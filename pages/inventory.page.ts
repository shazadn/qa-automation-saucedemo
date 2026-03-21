import { Page } from "@playwright/test";

export class InventoryPage {
  constructor(private page: Page) {}

  private cartBadge = '[data-test="shopping-cart-badge"]';
  private cartIcon = '[data-test="shopping-cart-link"]';
  private menuButton = "#react-burger-menu-btn";
  private logoutLink = '[data-test="logout-sidebar-link"]';
  private resetState = '[data-test="reset-sidebar-link"]';

  openMenu() {
    return this.page.locator(this.menuButton).click();
  }

  addItem(itemName: string) {
    return this.page.locator(`[data-test="add-to-cart-${itemName}"]`).click();
  }

  removeItem(itemName: string) {
    return this.page.locator(`[data-test="remove-${itemName}"]`).click();
  }

  getCartBadge() {
    return this.page.locator(this.cartBadge);
  }

  goToCart() {
    return this.page.locator(this.cartIcon).click();
  }

  async resetAppState() {
    await this.openMenu();
    await this.page.locator(this.resetState).click();
    await this.page.getByRole("button", { name: "Close Menu" }).click();
  }

  async logout() {
    await this.openMenu();
    await this.page.locator(this.logoutLink).click();

    await this.page.waitForURL("https://www.saucedemo.com/");
  }
}
