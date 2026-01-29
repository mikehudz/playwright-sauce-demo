const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { users } = require('../../utils/users');
const invalidUsers = [
  {
    username: 'wrong_user',
    password: 'secret_sauce',
    description: 'incorrect username',
    expectedError: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    username: 'standard_user',
    password: 'wrong_password',
    description: 'incorrect password',
    expectedError: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    username: '',
    password: 'secret_sauce',
    description: 'missing username',
    expectedError: 'Epic sadface: Username is required',
  },
  {
    username: 'standard_user',
    password: '',
    description: 'missing password',
    expectedError: 'Epic sadface: Password is required',
  },
  {
    username: '',
    password: '',
    description: 'missing username and password',
    expectedError: 'Epic sadface: Username is required',
  },
];

invalidUsers.forEach(({ username, password, description, expectedError }) => {
  test(`login fails with ${description}`, async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(username, password);

    const error = page.locator('[data-test="error"]');
    await expect(error).toHaveText(expectedError);
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
