/// <reference types="cypress" />

import PageElements from '../../support/selectors';

describe('Page Load Test', () => {
    beforeEach(() => {
        cy.visit('');
    })

    it('check that the page is loaded successfully', () => {
        cy.url().should('eq', 'https://www.saucedemo.com');

        cy.get('body').should('be.visible');

        cy.contains('Swag Labs').should('be.visible');
    })
})