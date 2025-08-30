import SignupLoginPage from '../pages/SignupLoginPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';

// Login command
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  SignupLoginPage.login(email, password);
});

// Add to cart command
Cypress.Commands.add('addToCart', (productIndex) => {
  cy.get('.features_items .product-image-wrapper').eq(productIndex).find('a[data-product-id]').click();
  cy.contains('Added!').should('be.visible');
  cy.contains('Continue Shopping').click();
});

// Verify product command
Cypress.Commands.add('verifyProduct', (name, price) => {
  ProductDetailsPage.verifyDetails(name, price);
});