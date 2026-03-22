import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";
import { CheckoutPage } from "../pages/checkout.page";
import {
  testUser,
  testItem,
  checkoutUser,
  successMessages,
  testItemTitle,
} from "../utils/testData";

test.describe("Cart Page Tests", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Login
    await loginPage.goto();
    await loginPage.login(testUser.username, testUser.password);

    // Reset app state to ensure cart/items are clean
    await inventoryPage.resetAppState();

    // Add item and go to cart
    await inventoryPage.addItem(testItem.name);
    await inventoryPage.goToCart();

    // Continue to checkout page
    await cartPage.checkout();
    await expect(page).toHaveURL(/checkout-step-one/);
  });

  test("user can fill checkout info and proceed to checkout successfully", async ({
    page,
  }) => {
    await checkoutPage.fillCheckoutForm(
      checkoutUser.firstName,
      checkoutUser.lastName,
      checkoutUser.zipCode,
    );
    // Assertion: user is now on checkout step two page
    await expect(page).toHaveURL(/checkout-step-two/);
    // Assertion: Verify that the item in the cart matches the expected product name
    await expect(
      cartPage.getCartItems().locator(".inventory_item_name"),
    ).toHaveText(testItemTitle.name);

    // Complete order
    await checkoutPage.finishOrder();
    // Assertion: user is now on checkout complete page
    await expect(page).toHaveURL(/checkout-complete/);
    // Assertion: success message appears
    await expect(checkoutPage.getSuccessMessage()).toHaveText(
      successMessages.orderSuccess,
    );
  });
});
