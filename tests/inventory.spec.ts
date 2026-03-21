import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { testUser, testItem } from "../utils/testData";

test("user can add item to cart from inventory page", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(testUser.username, testUser.password);

  // Add item to cart
  await inventoryPage.addItem(testItem.name);

  // Assertion: cart badge should update to show 1 item
  await expect(inventoryPage.getCartBadge()).toHaveText("1");
});

test("user can remove item from inventory page", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(testUser.username, testUser.password);

  // Add item first (precondition)
  await inventoryPage.addItem(testItem.name);

  // Remove item
  await inventoryPage.removeItem(testItem.name);

  // Assertion: cart badge should no longer be visible
  await expect(inventoryPage.getCartBadge()).toHaveCount(0);
});

test("user can logout successfully", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(testUser.username, testUser.password);

  await inventoryPage.logout();

  // Assert user is redirected to login page
  await expect(page).toHaveURL("https://www.saucedemo.com/");
});
