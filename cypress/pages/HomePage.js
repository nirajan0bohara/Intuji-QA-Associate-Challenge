class HomePage {
  getSignupLoginButton() {
    return cy.get('a[href="/login"]');
  }
  getLogoutButton() {
    return cy.get('a[href="/logout"]');
  }
  getProductsButton() {
    return cy.get('a[href="/products"]');
  }
  getCartButton() {
    return cy.get('a[href="/view_cart"]');
  }
  verifyLoggedIn(username) {
    // After account creation, navigate to homepage to verify login
    cy.visit('/');
    cy.get('body').then($body => {
      cy.log($body.text());
      // Check for 'Logged in as' and username together
      expect($body.text().toLowerCase()).to.include('logged in as');
      expect($body.text()).to.include(username);
    });
  }
}

export default new HomePage();