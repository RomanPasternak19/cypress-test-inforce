import {
    inventoryItemsNameText,
    itemPrices,
    taxRate,
    validUsername,
    validPassword,
    yourInfo
} from '../../../fixtures/test-data.json';

import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import CompletePage from '../pages/CompletePage';
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';

describe('Checkout Process', () => {
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

    it('Should complete the checkout process and verify items and total price', () => {
        mainPage.openShoppingCart();

        cartPage.clickCheckout();

        cy.fillCheckoutInformation(yourInfo.firstName, yourInfo.lastName, yourInfo.postalCode);

        checkoutPage.clickContinue();

        cartPage.verifyTotalPriceWithTax(itemPrices, taxRate);
    });
    
    it('Should submit the checkout and Complete page should be displayed from the confirmation message', () => {
        mainPage.openShoppingCart();

        cartPage.clickCheckout();

        cy.fillCheckoutInformation(yourInfo.firstName, yourInfo.lastName, yourInfo.postalCode);

        checkoutPage.clickContinue();
    
        cartPage.submitCheckout();
    
        completePage.verifyPageIsLoaded();

        completePage.verifyConfirmationMessage();
      })
});