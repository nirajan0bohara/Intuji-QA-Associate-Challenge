import { faker } from '@faker-js/faker';

class SignupLoginPage {
    getSignupNameInput() {
        return cy.get('[data-qa="signup-name"]');
    }
    getSignupEmailInput() {
        return cy.get('[data-qa="signup-email"]');
    }
    getSignupButton() {
        return cy.get('[data-qa="signup-button"]');
    }
    getLoginEmailInput() {
        return cy.get('[data-qa="login-email"]');
    }
    getLoginPasswordInput() {
        return cy.get('[data-qa="login-password"]');
    }
    getLoginButton() {
        return cy.get('[data-qa="login-button"]');
    }

    registerNewUser() {
    const name = faker.person.firstName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    this.getSignupNameInput().type(name);
    this.getSignupEmailInput().type(email);
    this.getSignupButton().click();

    cy.get('#id_gender1').check();  // Mr.
    cy.get('[data-qa="password"]').type(password);

    cy.get('[data-qa="first_name"]').type(name);
    cy.get('[data-qa="last_name"]').type(faker.person.lastName());
    cy.get('[data-qa="address"]').type(faker.location.streetAddress());
    cy.get('[data-qa="country"]').select('United States');
    cy.get('[data-qa="state"]').type(faker.location.state());
    cy.get('[data-qa="city"]').type(faker.location.city());
    cy.get('[data-qa="zipcode"]').type(faker.location.zipCode());
    cy.get('[data-qa="mobile_number"]').type(faker.phone.number());

    cy.get('[data-qa="create-account"]').click();
    cy.url().should('include', '/account_created');
    cy.contains('Account Created!').should('be.visible');
    return { name, email, password };
    }

    handleDuplicateEmail() {
        cy.get('body').then($body => {
            if ($body.text().includes('Email Address already exist!')) {
                // If duplicate email message is present, try registering again with a new email
                this.registerNewUser();
            }
        });
    }

    login(email, password) {
        this.getLoginEmailInput().type(email);
        this.getLoginPasswordInput().type(password);
        this.getLoginButton().click();
    }
}

export default new SignupLoginPage();