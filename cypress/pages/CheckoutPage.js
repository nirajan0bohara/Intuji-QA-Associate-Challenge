import { faker } from '@faker-js/faker';

class CheckoutPage {
  fillAddressIfNeeded() {
    cy.get('[data-qa="address"]').if('empty').then(() => {
      cy.get('[data-qa="address"]').type(faker.location.streetAddress());
    });
  }
  enterCardDetails() {
    cy.get('[data-qa="name-on-card"]').type(faker.person.fullName());
    cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber());
    cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV());
    cy.get('[data-qa="expiry-month"]').type('12');
    cy.get('[data-qa="expiry-year"]').type('2030');
  }
  confirmOrder() {
    cy.get('[data-qa="pay-button"]').click();
    cy.contains('Order Placed!').should('be.visible');
  }
}

export default new CheckoutPage();