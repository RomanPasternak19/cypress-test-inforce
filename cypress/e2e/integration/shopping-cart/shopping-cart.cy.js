import {
    validUsername,
    validPassword,
    inventoryItemsNameText,
    yourInfo
} from '../../../fixtures/test-data.json';

import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';

describe('Shopping Cart', () => {
    const loginPage = new LoginPage();
    const mainPage = new MainPage();
    const cartPage = new CartPage();
    const checkoutPage = new CheckoutPage();

    beforeEach(() => {
        loginPage.visit();

        cy.login(validUsername, validPassword);
    });

    it('Should add items to the cart and update cart icon', () => {
        cy.addToCart(inventoryItemsNameText);
        
        mainPage.verifyNumberOfItemsOnCartIcon(inventoryItemsNameText.length());

        mainPage.openShoppingCart();

        cartPage.verifyCartItemsCount(inventoryItemsNameText.length());
    });

    it('Should add items to the cart, proceed to checkout, and verify items for checkout', () => {
        cy.addToCart(inventoryItemsNameText);

        mainPage.openShoppingCart();

        cartPage.verifyCartItemsCount(inventoryItemsNameText.length());
        cartPage.verifyCartItemNames(inventoryItemsNameText);

        cartPage.clickCheckout();

        cy.fillCheckoutInformation(yourInfo.firstName, yourInfo.lastName, yourInfo.postalCode);

        checkoutPage.clickContinue()

        cartPage.verifyCartItemsCount(inventoryItemsNameText.length());
        cartPage.verifyCartItemNames(inventoryItemsNameText);
    }); 
});