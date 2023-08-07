import {
    inventoryItemsNameText,
    validUsername,
    validPassword,
    yourInfo,
} from '../../../fixtures/test-data.json';

import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import CompletePage from '../pages/CompletePage';
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';

describe('Logout', () => {
    const loginPage = new LoginPage();
    const mainPage = new MainPage();
    const cartPage = new CartPage();
    const checkoutPage = new CheckoutPage();
    const completePage = new CompletePage();

    beforeEach(() => {
        loginPage.visit();

        cy.login(validUsername, validPassword);

        cy.addToCart(inventoryItemsNameText);
    });
    
    it('Should logout successfully', () => {
        mainPage.openShoppingCart();

        cartPage.clickCheckout();

        cy.fillCheckoutInformation(yourInfo.firstName, yourInfo.lastName, yourInfo.postalCode);

        checkoutPage.clickContinue();
    
        cartPage.submitCheckout();
    
        completePage.clickBackToProducts();

        mainPage.openBurgerMenu();
  
        mainPage.clickLogout();
    
        loginPage.verifyPageIsLoaded();
      })
});