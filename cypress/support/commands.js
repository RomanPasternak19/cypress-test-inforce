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

Cypress.Commands.add('fillCheckoutInformation', (firstName, lastName, postalCode) => {
    cy.get('[data-test=firstName]').type(firstName);
    cy.get('[data-test=lastName]').type(lastName);
    cy.get('[data-test=postalCode]').type(postalCode);
});

Cypress.Commands.add('login', (username, password) => { 
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);

    cy.get('[data-test="login-button"]').click();
})