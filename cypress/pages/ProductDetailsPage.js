class ProductDetailsPage {
  getProductName() {
    return cy.get('.product-information h2');
  }
  getProductPrice() {
    return cy.get('.product-information span span');
  }
  getAvailability() {
    return cy.get('.product-information p').contains('In Stock');
  }
  verifyDetails(name, price) {
    this.getProductName().should('contain', name);
    this.getProductPrice().should('contain', price);
    this.getAvailability().should('be.visible');
  }
  addToCart() {
    cy.get('button[type="button"]').contains('Add to cart').click();
  }
}

export default new ProductDetailsPage();