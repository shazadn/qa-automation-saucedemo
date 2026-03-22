import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";
import { testUser, testItem, testItemTitle } from "../utils/testData";

test.describe("Cart Page Tests", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    // Login
    await loginPage.goto();
    await loginPage.login(testUser.username, testUser.password);

    // Reset app state to ensure cart/items are clean
    await inventoryPage.resetAppState();
  });

  test("item added from inventory is visible in cart", async ({}) => {
    // Add item and go to cart
    await inventoryPage.addItem(testItem.name);
    await inventoryPage.goToCart();

    // Assertion: cart has 1 item
    await expect(cartPage.getCartItems()).toHaveCount(1);

    // Assertion: item name matches expected
    await expect(
      cartPage.getCartItems().first().locator(".inventory_item_name"),
    ).toHaveText(testItemTitle.name);
  });

  test("user can remove item from cart page", async ({}) => {
    // Add item and go to cart
    await inventoryPage.addItem(testItem.name);
    await inventoryPage.goToCart();

    // Remove item
    await cartPage.removeItem(testItem.name);

    // Assertion: cart should be empty
    await expect(cartPage.getCartItems()).toHaveCount(0);
  });
});
