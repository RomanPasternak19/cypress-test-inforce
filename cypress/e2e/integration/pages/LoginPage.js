import {baseUrl, loginPageLogoText, placeholderUsernameText, placeholderPasswordText} from '../../../fixtures/test-data.json';

class LoginPage {
    
    usernameInput = '[data-test=username]';
    passwordInput = '[data-test=password]';
    loginButton = '[data-test=login-button]';
    errorMessage = '[data-test="error"]';
  
    visit() {
        cy.visit(baseUrl);
    }

    verifyPageIsLoaded() {
        cy.url().should('eq', baseUrl);
        cy.get('body').should('be.visible');
        cy.contains(loginPageLogoText).should('be.visible');
    }

    typeUsernameAndPassword(username, password) {
        cy.get(this.usernameInput).type(username);
        cy.get(this.passwordInput).type(password);
    }
    
    verifyUsernameAndPasswordInputs(username, password) {
        cy.get(this.usernameInput).should('have.value', username);
        cy.get(this.passwordInput).should('have.value', password);
    }

    clearUsernameAndPasswordInputs() {
        cy.get(this.usernameInput).clear().should('have.value', '');
        cy.get(this.passwordInput).clear().should('have.value', '');
    }

    verifyInputFieldsVisibleAndPlaceholders() {
        cy.get(this.usernameInput)
            .should('be.visible')
            .invoke('attr', 'placeholder')
            .should('eq', placeholderUsernameText);
    
        cy.get(this.passwordInput)
            .should('be.visible')
            .invoke('attr', 'placeholder')
            .should('eq', placeholderPasswordText);
    }

    verifyLoginButtonIsVisible() {
        cy.get(this.loginButton).should('be.visible');
    }

    clickLoginButton() {
        cy.get(this.loginButton).click();
    }

    verifyErrorMessage(message) {
        cy.get(this.errorMessage)
            .should('be.visible')
            .and('contain', message);
    }
}
  
export default LoginPage;
  