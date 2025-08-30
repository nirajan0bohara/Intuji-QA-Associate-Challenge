class ProductsPage {
  getCategoryWomen() {
    return cy.get('.category-products > .panel-group > #Women');
  }
  getSubCategoryDress() {
    return cy.get('#Women > .panel-body > ul > li > a[href="/category_products/3"]');
  }
  getProductList() {
    return cy.get('.features_items .product-image-wrapper');
  }
  verifyFilteredProducts(keyword = 'Dress') {
    this.getProductList().each(($el) => {
      cy.wrap($el).contains(keyword).should('exist');
    });
  }
  clickFirstProduct() {
    this.getProductList().first().find('a[href^="/product_details"]').click();
  }
}

export default new ProductsPage();