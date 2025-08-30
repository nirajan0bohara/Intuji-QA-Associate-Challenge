import HomePage from '../pages/HomePage';
import SignupLoginPage from '../pages/SignupLoginPage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import AccountPage from '../pages/AccountPage';

describe('Automation Exercise E2E Test', () => {
  let user;

  before(() => {
    // Intercept API for bonus 
    cy.intercept('GET', '/api/productsList').as('getProducts');
    cy.visit('/');
    // Register once
    cy.visit('/login');
    user = SignupLoginPage.registerNewUser();
    SignupLoginPage.handleDuplicateEmail();  
    HomePage.verifyLoggedIn(user.name);
    // Store session using cy.session (Cypress v12+)
    cy.session([user.email, user.password], () => {
      cy.visit('/login');
      SignupLoginPage.login(user.email, user.password);
    });
  });

  beforeEach(() => {
  // Preserve session across tests
  cy.visit('/');
  });

  it('Product Browsing & Filtering', () => {
  HomePage.getProductsButton().click();
  cy.wait('@getProducts').its('response.statusCode').should('eq', 200);
  ProductsPage.getCategoryWomen().click();
  ProductsPage.getSubCategoryDress().click();
  ProductsPage.verifyFilteredProducts('Dress');
  ProductsPage.clickFirstProduct();
  cy.fixture('userData').then((data) => {
      ProductDetailsPage.verifyDetails(data.products[0].name, data.products[0].price);
    });
    cy.matchImageSnapshot('product-details');  
  });

  it('Cart and Quantity Management', () => {
    // Add multiple items
    cy.addToCart(0); 
    cy.addToCart(1);  
    HomePage.getCartButton().click();
    CartPage.updateQuantity(0, 3);
    CartPage.verifyTotal();
    CartPage.removeItem(1);
    CartPage.verifyTotal();
    cy.screenshot('cart-updated');
  });

  it('Checkout Flow with Fake Payment', () => {
    HomePage.getCartButton().click();
    CartPage.proceedToCheckout();
    CheckoutPage.fillAddressIfNeeded();
    CheckoutPage.enterCardDetails();
    CheckoutPage.confirmOrder();
  });

  it('Logout and Re-login', () => {
    HomePage.getLogoutButton().click();
    cy.contains('Login to your account').should('be.visible');
    cy.login(user.email, user.password);
    HomePage.verifyLoggedIn(user.name);
    AccountPage.verifyUserState(); 
  });

  // Bonus: Negative scenarios
  it('Negative: Register with existing email', () => {
    cy.visit('/login');
    SignupLoginPage.getSignupNameInput().type('Test');
    SignupLoginPage.getSignupEmailInput().type(user.email); 
    SignupLoginPage.getSignupButton().click();
    cy.contains('Email Address already exist!').should('be.visible');
  });

  it('Negative: Checkout with empty cart', () => {
    cy.visit('/view_cart');
    CartPage.proceedToCheckout();
    cy.contains('Cart is empty').should('be.visible');
  });
});