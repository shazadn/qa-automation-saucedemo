import { Page } from "@playwright/test";

// Represents the Inventory Page of Sauce Demo
export class InventoryPage {
  constructor(private page: Page) {}

  // Selectors
  private cartBadge = '[data-test="shopping-cart-badge"]'; //Shows number of items in the cart
  private cartLink = '[data-test="shopping-cart-link"]'; //Navigates to the cart page
  private menuButton = "#react-burger-menu-btn"; //Hamburger menu button
  private logoutLink = '[data-test="logout-sidebar-link"]'; //Logout link in the menu
  private resetState = '[data-test="reset-sidebar-link"]'; //Reset app state link in the menu

  // Open hamburger menu
  openMenu() {
    return this.page.locator(this.menuButton).click();
  }

  // Adds an item to the cart by item name
  addItem(itemName: string) {
    return this.page.locator(`[data-test="add-to-cart-${itemName}"]`).click();
  }

  // Removes an item from the cart by item name
  removeItem(itemName: string) {
    return this.page.locator(`[data-test="remove-${itemName}"]`).click();
  }

  // Returns cart badge count
  getCartBadge() {
    return this.page.locator(this.cartBadge);
  }

  // Navigates to the cart page
  goToCart() {
    return this.page.locator(this.cartLink).click();
  }

  // Resets app state (clears cart and other temporary states)
  async resetAppState() {
    await this.openMenu();
    await this.page.locator(this.resetState).click();
    await this.page.getByRole("button", { name: "Close Menu" }).click();
  }

  // Logs the user out via the menu
  async logout() {
    await this.openMenu();
    await this.page.locator(this.logoutLink).click();

    await this.page.waitForURL("https://www.saucedemo.com/");
  }
}
