class ProductsPage {
  constructor(page) {
    this.page = page;
  }

  async addFirstProductToCart() {
    await this.page.getByRole('button', { name: 'Add to cart' }).first().click();
  }

  async openCart() {
    const cartLink = this.page.locator('a.shopping_cart_link');
    await cartLink.waitFor({ state: 'visible', timeout: 5000 });
    await cartLink.click();
  }
}

module.exports = { ProductsPage };
