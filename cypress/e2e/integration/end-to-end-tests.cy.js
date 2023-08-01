/// <reference types="cypress" />

import PageElements from '../../support/selectors';

const {
    baseUrl,
    mainPageUrl,
    validUsername,
    validPassword,
    invalidUsername,
    invalidPassword,
    lockedUsername,
    someUsername,
    somePassword,
    mainPageLogoText,
    placeholderUsernameText,
    placeholderPasswordText
} = Cypress.env("data");

beforeEach(() => {
    cy.visit('/');
});

describe('Page Load Test', () => {
    it('Check that the page is loaded successfully', () => {
        cy.url().should('eq', baseUrl);

        cy.get('body').should('be.visible');

        cy.contains(mainPageLogoText).should('be.visible');
    })

    it('Verifies that [Log in] button is visible for the user', () => {
        cy.get(PageElements.loginButton).should('be.visible');
    });

    it('Clears inputs', () => {
        cy.get(PageElements.usernameInput).type(someUsername);
        cy.get(PageElements.passwordInput).type(somePassword);
    
        cy.get(PageElements.usernameInput).should('have.value', someUsername);
        cy.get(PageElements.passwordInput).should('have.value', somePassword);
    
        cy.get(PageElements.usernameInput).clear().should('have.value', '');
        cy.get(PageElements.passwordInput).clear().should('have.value', '');
    });

    it('Verifies that input fields (email/password) are visible and have placeholders', () => {
        cy.get(PageElements.usernameInput)
          .should('be.visible')
          .invoke('attr', 'placeholder')
          .should('eq', placeholderUsernameText);
    
        cy.get(PageElements.passwordInput)
          .should('be.visible')
          .invoke('attr', 'placeholder')
          .should('eq', placeholderPasswordText);
    });
});

describe('Login Form Tests', () => {
    it('Positive Test Case: Successful Login', () => {
      cy.get(PageElements.usernameInput).type(validUsername);
      cy.get(PageElements.passwordInput).type(validPassword);

      cy.get(PageElements.loginButton).click();

      cy.url().should('eq', mainPageUrl);
    });
  
    it('Negative Test Case: Invalid Credentials', () => {
      cy.get(PageElements.usernameInput).type(invalidUsername);
      cy.get(PageElements.passwordInput).type(invalidPassword);

      cy.get(PageElements.loginButton).click();

      cy.get(PageElements.errorMessage).should('be.visible');
    });
  
    it('Negative Test Case: Locked User', () => {
      cy.get(PageElements.usernameInput).type(lockedUsername);
      cy.get(PageElements.passwordInput).type(validPassword);

      cy.get(PageElements.loginButton).click();

      cy.get(PageElements.errorMessage).should('be.visible').contains('Sorry, this user has been locked out.');
    });
});

describe('Hamburger Menu and Logout Tests', () => {
    it('Verifies that the user can log out successfully', () => {
      cy.get(PageElements.usernameInput).type(validUsername);
      cy.get(PageElements.passwordInput).type(validPassword);

      cy.get(PageElements.loginButton).click();
  
      cy.get(PageElements.hamburgerMenu).click();
  
      cy.get(PageElements.logoutButton).should('be.visible');
  
      cy.get(PageElements.logoutButton).click();
  
      cy.url().should('eq', baseUrl);
    });
});
  