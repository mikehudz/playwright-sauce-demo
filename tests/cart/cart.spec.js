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

// Test total count increases when adding multiple items

// Test Remove items
// First check for items, if none then add item, remove item, verify count decreases, should empty if last item removed

// Test sort
// Name A-Z
// Name Z-A
// Price (low to high)
// Price (high to low)

// Click on a specific item
// Add this item to the cart
// Remove this item from the cart
// Verify button should display 'Add to cart'
// If item is already in cart, button should display 'Remove'
