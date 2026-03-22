import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";
import { CheckoutPage } from "../pages/checkout.page";
import {
  testUser,
  testItem,
  checkoutUser,
  testItemTitle,
  successMessages,
} from "../utils/testData";

test("full end-to-end purchase flow", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  //Step 1: Login
  await loginPage.goto();
  await loginPage.login(testUser.username, testUser.password);

  //Step 2: Reset app state & add item
  await inventoryPage.resetAppState();
  await inventoryPage.addItem(testItem.name);
  await inventoryPage.goToCart();

  //Step 3: Verify cart
  await expect(cartPage.getCartItems()).toHaveCount(1);
  await expect(
    cartPage.getCartItems().first().locator(".inventory_item_name"),
  ).toHaveText(testItemTitle.name);

  //Step 4: Checkout
  await cartPage.checkout();
  await checkoutPage.fillCheckoutForm(
    checkoutUser.firstName,
    checkoutUser.lastName,
    checkoutUser.zipCode,
  );

  //Step 5: Assert checkout step two loaded
  await expect(page).toHaveURL(/checkout-step-two/);
  await expect(
    cartPage.getCartItems().first().locator(".inventory_item_name"),
  ).toHaveText(testItemTitle.name);

  //Step 6: Finish order
  await checkoutPage.finishOrder();
  await expect(page).toHaveURL(/checkout-complete/);

  //Step 7: Assert success
  await expect(checkoutPage.getSuccessMessage()).toHaveText(
    successMessages.orderSuccess,
  );
});
