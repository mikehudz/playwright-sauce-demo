const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { users } = require('../../utils/users');

test('standard user can log in', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.login(users.standard.username, users.standard.password);

  // Verify login success by checking the URL
  await expect(page).toHaveURL(/inventory/);
});

test('locked out user sees error', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.login(users.locked.username, users.locked.password);

  // Verify login failure shows the error
  await login.assertLoginError();
});
