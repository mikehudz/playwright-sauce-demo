const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { ProductsPage } = require('../../pages/ProductsPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { users } = require('../../utils/users');

test('user can complete checkout', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  // Login
  await login.goto();
  await login.login(users.standard.username, users.standard.password);

  // Add first product to cart
  await products.addFirstProductToCart();

  // Open Cart
  await products.openCart();

  // Click Checkout
  await cart.checkout();

  // Fill Customer Info
  await checkout.fillCustomerInfo('Mike', 'Hudson', '12345');
  await checkout.finishCheckout();

  // Verify order completion
  await checkout.assertOrderComplete();
});
