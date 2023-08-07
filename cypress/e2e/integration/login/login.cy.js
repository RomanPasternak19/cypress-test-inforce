import {
    invalidPassword,
    invalidUserErrorText,
    invalidUsername,
    somePassword,
    someUsername,
    validPassword,
    validUsername
} from '../../../fixtures/test-data.json';

import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';

describe('Login Pages', () => {
    const loginPage = new LoginPage();
    const mainPage = new MainPage();

    beforeEach(() => {
        cy.intercept('/').as('matchedUrl');

        loginPage.visit();
        
        cy.wait('@matchedUrl').then(({response}) => {
            expect(response.statusCode).to.eq(200);
        });
    });

    it('Check that the page is loaded successfully', () => {
        loginPage.verifyPageIsLoaded();
    })

    it('(Optional) Verifies that [Log in] button is visible for the user', () => {
        loginPage.verifyLoginButtonIsVisible();
    });

    it('(Optional) Verifies that input fields (email/password) are visible and have placeholders', () => {
        loginPage.verifyInputFieldsVisibleAndPlaceholders();
    });

    it('(Optional) Clears inputs', () => {
        loginPage.typeUsernameAndPassword(someUsername, somePassword);
        loginPage.verifyUsernameAndPasswordInputs(someUsername, somePassword);

        loginPage.clearUsernameAndPasswordInputs();
    });

    it('Should allow a user with valid credentials to log in successfully', () => {
        cy.login(validUsername, validPassword);

        mainPage.verifyPageIsLoaded()
    });

    it('Should show an error message for invalid login credentials', () => {
        loginPage.typeUsernameAndPassword(invalidUsername, invalidPassword);
        loginPage.clickLoginButton();

        loginPage.verifyErrorMessage(invalidUserErrorText);
    });
});