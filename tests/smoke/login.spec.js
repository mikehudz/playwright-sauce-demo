const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { users } = require('../../utils/users');
const invalidUsers = [
  { username: 'wrong_user', password: 'secret_sauce', description: 'incorrect username' },
  { username: 'standard_user', password: 'wrong_password', description: 'incorrect password' },
];

invalidUsers.forEach(({ username, password, description }) => {
  test(`login fails with ${description}`, async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(username, password);

    const error = page.locator('[data-test="error"]');
    await expect(error).toHaveText(/Epic sadface/i);
  });
});

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
