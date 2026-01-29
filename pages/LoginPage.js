class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com');
  }

  async login(username, password) {
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async assertLoginError() {
    await this.page.getByText('Epic sadface').isVisible();
  }
}

module.exports = { LoginPage };
