class AccountPage {
  verifyUserState() {
    cy.get('a[href="/orders"]').click();
    cy.contains('Recent Orders').should('be.visible');  // Example
  }
}

export default new AccountPage();