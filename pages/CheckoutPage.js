class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  async fillCustomerInfo(firstName, lastName, zip) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(zip);
  }

  async finishCheckout() {
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await this.page.getByRole('button', { name: 'Finish' }).click();
  }

  async assertOrderComplete() {
    await this.page.getByText('Thank you for your order').isVisible();
  }
}

module.exports = { CheckoutPage };
