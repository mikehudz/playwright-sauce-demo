const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { ProductsPage } = require('../../pages/ProductsPage');
const { users } = require('../../utils/users');

test('user can add item to cart', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);

  // Login
  await login.goto();
  await login.login(users.standard.username, users.standard.password);

  // Add first product to cart
  await products.addFirstProductToCart();

  // Open Cart
  await products.openCart();

  // Verify cart contains product
  await expect(page).toHaveURL(/cart/);
  await expect(page.locator('.inventory_item_name')).toHaveCount(1);
});
