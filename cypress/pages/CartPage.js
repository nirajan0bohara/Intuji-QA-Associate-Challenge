class CartPage {
  getCartItems() {
    return cy.get('.cart_product');
  }
  updateQuantity(index, qty) {
    cy.get('.cart_quantity input').eq(index).clear().type(qty);
    cy.get('.cart_quantity_button').click();  
  }
  removeItem(index) {
    cy.get('.cart_delete').eq(index).click();
  }
  verifyTotal() {
   
    let total = 0;
    cy.get('.cart_price').each(($price, i) => {
      cy.get('.cart_quantity').eq(i).invoke('val').then((qty) => {
        total += parseFloat($price.text()) * parseInt(qty);
      });
    }).then(() => {
      cy.get('#total').should('contain', total); 
    });
  }
  proceedToCheckout() {
  cy.get('a[href="/checkout"]').should('be.visible').click();
  }
}

export default new CartPage();