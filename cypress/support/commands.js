// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => { 
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);

    cy.get('[data-test="login-button"]').click();
})


// Login page commands

Cypress.Commands.add('verifyPageIsLoaded', (url, pageLogoText) => { 
    cy.url().should('eq', url);
    cy.contains(pageLogoText).should('be.visible');
})

Cypress.Commands.add('verifyLoginButtonIsVisible', () => { 
    cy.get('[data-test=login-button]').should('be.visible');
})

Cypress.Commands.add('verifyInputFieldsVisibleAndPlaceholders', (placeholderUsernameText, placeholderPasswordText) => { 
    cy.get('[data-test=username]')
        .should('be.visible')
        .invoke('attr', 'placeholder')
        .should('eq', placeholderUsernameText);

    cy.get('[data-test=password]')
        .should('be.visible')
        .invoke('attr', 'placeholder')
        .should('eq', placeholderPasswordText);
})

Cypress.Commands.add('typeUsernameAndPassword', (username, password) => { 
    cy.get('[data-test=username]').type(username);
    cy.get('[data-test=password]').type(password);
})

Cypress.Commands.add('verifyUsernameAndPasswordInputs', (username, password) => { 
    cy.get('[data-test=username]').should('have.value', username);
    cy.get('[data-test=password]').should('have.value', password);
})

Cypress.Commands.add('clearUsernameAndPasswordInputs', () => { 
    cy.get('[data-test=username]').clear().should('have.value', '');
    cy.get('[data-test=password]').clear().should('have.value', '');
})

Cypress.Commands.add('clickLoginButton', () => { 
    cy.get('[data-test=login-button]').click();
})

Cypress.Commands.add('verifyErrorMessage', (message) => { 
    cy.get('[data-test="error"]')
        .should('be.visible')
        .and('contain', message);
})


// Main page commands

Cypress.Commands.add('verifyNumberOfItemsOnCartIcon', (count) => { 
    cy.get('.shopping_cart_badge').should('have.text', count.toString());
})

Cypress.Commands.add('addToCart', (itemNames) => {
    cy.get('.inventory_list').within(() => {
        itemNames.forEach((itemName) => {
            cy.contains('.inventory_item_name', itemName)
                .parents('.inventory_item')
                .within(() => {
                    cy.get('.btn_primary.btn_inventory').click();
            });
        });
    });
});

Cypress.Commands.add('openShoppingCart', () => { 
    cy.get('.shopping_cart_link').click();
})

Cypress.Commands.add('openBurgerMenu', () => { 
    cy.get('.bm-burger-button').click();
})

Cypress.Commands.add('clickLogout', () => { 
    cy.get('#logout_sidebar_link').click();
})


// Shopping Cart page commands

Cypress.Commands.add('verifyCartItemsCount', (count) => { 
    cy.get('.cart_item').should('have.length', count);
})

Cypress.Commands.add('verifyCartItemNames', (items) => { 
    items.forEach(item => {
        cy.contains('.cart_item', item).should('be.visible');
    });
})

Cypress.Commands.add('clickCheckout', () => { 
    cy.get('[data-test=checkout]').click();
})

Cypress.Commands.add('verifyTotalPriceWithTax', (prices, tax) => { 
    const totalItemsPrice = Object.values(prices).reduce((total, price) => total + price, 0);
    const expectedTotalPrice = totalItemsPrice * (1 + tax);

    cy.get('.summary_total_label').should('contain.text', 'Total: $' + expectedTotalPrice.toFixed(2));
})

Cypress.Commands.add('submitCheckout', () => { 
    cy.get('[data-test=finish]').click();
})


// Checkout page commands

Cypress.Commands.add('fillCheckoutInformation', (firstName, lastName, postalCode) => {
    cy.get('[data-test=firstName]').type(firstName);
    cy.get('[data-test=lastName]').type(lastName);
    cy.get('[data-test=postalCode]').type(postalCode);
});

Cypress.Commands.add('clickContinue', () => { 
    cy.get('[data-test=continue]').click();
})


// Complete page commands

Cypress.Commands.add('verifyConfirmationMessage', (headerText, infoText) => { 
    cy.contains('.complete-header', headerText).should('be.visible');
    cy.contains('.complete-text', infoText).should('be.visible');
})

Cypress.Commands.add('clickBackToProducts', () => { 
    cy.get('[data-test=back-to-products]').click();
})