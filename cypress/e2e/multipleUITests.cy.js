import data from '../fixtures/test-data.json';

describe('User interface tests for', () => {
    const baseUrl = Cypress.config().baseUrl;

    context('Login Page', () => {
        beforeEach(() => {
            cy.intercept('/').as('matchedUrl');
    
            cy.visit('/');
            
            cy.wait('@matchedUrl').then(({response}) => {
                expect(response.statusCode).to.eq(200);
            });
        });
    
        it('Check that the page is loaded successfully', () => {
            cy.verifyPageIsLoaded(baseUrl, data.loginPageLogoText);
        })
    
        it('(Optional) Validates the login form', () => {
            cy.verifyInputFieldsVisibleAndPlaceholders(data.placeholderUsernameText, data.placeholderPasswordText);
            cy.verifyLoginButtonIsVisible();
        });
    
        it('(Optional) Clears inputs', () => {
            cy.typeUsernameAndPassword(data.someUsername, data.somePassword);
            cy.verifyUsernameAndPasswordInputs(data.someUsername, data.somePassword);
    
            cy.clearUsernameAndPasswordInputs();
        });
    
        it('Should allow a user with valid credentials to log in successfully', () => {
            cy.login(data.validUsername, data.validPassword);
    
            cy.verifyPageIsLoaded(data.mainPageRoute, data.mainPageLogoText);
        });
    
        it('Should show an error message for invalid login credentials', () => {
            cy.typeUsernameAndPassword(data.invalidUsername, data.invalidPassword);
            cy.clickLoginButton();
    
            cy.verifyErrorMessage(data.invalidUserErrorText);
        });
    })

    context('Shopping Cart', () => {
        beforeEach(() => {
            cy.visit('/');
    
            cy.login(data.validUsername, data.validPassword);
        });
    
        it('Should add items to the cart and update cart icon', () => {
            cy.addToCart(data.inventoryItemsNameText);
            
            cy.verifyNumberOfItemsOnCartIcon(data.inventoryItemsNameText.length);
    
            cy.openShoppingCart();
    
            cy.verifyCartItemsCount(data.inventoryItemsNameText.length);
        });
    
        it('Should add items to the cart, proceed to checkout, and verify items for checkout', () => {
            cy.addToCart(data.inventoryItemsNameText);
    
            cy.openShoppingCart();
    
            cy.verifyCartItemsCount(data.inventoryItemsNameText.length);
            cy.verifyCartItemNames(data.inventoryItemsNameText);
    
            cy.clickCheckout();
    
            cy.fillCheckoutInformation(data.yourInfo.firstName, data.yourInfo.lastName, data.yourInfo.postalCode);
    
            cy.clickContinue()
    
            cy.verifyCartItemsCount(data.inventoryItemsNameText.length);
            cy.verifyCartItemNames(data.inventoryItemsNameText);
        });
    })

    context('Checkout Process', () => {
        beforeEach(() => {
            cy.visit('/');
    
            cy.login(data.validUsername, data.validPassword);
    
            cy.addToCart(data.inventoryItemsNameText);
        });
    
        it('Should complete the checkout process and verify items and total price', () => {
            cy.openShoppingCart();
    
            cy.clickCheckout();
    
            cy.fillCheckoutInformation(data.yourInfo.firstName, data.yourInfo.lastName, data.yourInfo.postalCode);
    
            cy.clickContinue();
    
            cy.verifyTotalPriceWithTax(data.itemPrices, data.taxRate);
        });
        
        it('Should submit the checkout and Complete page should be displayed from the confirmation message', () => {
            cy.openShoppingCart();
    
            cy.clickCheckout();
    
            cy.fillCheckoutInformation(data.yourInfo.firstName, data.yourInfo.lastName, data.yourInfo.postalCode);
    
            cy.clickContinue();
        
            cy.submitCheckout();
        
            cy.verifyPageIsLoaded(data.completePageRoute, data.completeHeaderText);
    
            cy.verifyConfirmationMessage(data.completeHeaderText, data.completeInfoText);
        })
    })

    context('Logout', () => {
        beforeEach(() => {
            cy.visit('/');
    
            cy.login(data.validUsername, data.validPassword);
    
            cy.addToCart(data.inventoryItemsNameText);
        });
        
        it('Should logout successfully', () => {
            cy.openShoppingCart();
    
            cy.clickCheckout();
    
            cy.fillCheckoutInformation(data.yourInfo.firstName, data.yourInfo.lastName, data.yourInfo.postalCode);
    
            cy.clickContinue();
        
            cy.submitCheckout();
        
            cy.clickBackToProducts();
    
            cy.openBurgerMenu();
      
            cy.clickLogout();
        
            cy.verifyPageIsLoaded(baseUrl, data.loginPageLogoText);
        })
    })
})