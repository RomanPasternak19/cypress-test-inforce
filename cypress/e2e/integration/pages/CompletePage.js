import {completePageRoute, completeHeaderText, completeInfoText} from '../../../fixtures/test-data.json';

class CompletePage {
    
    backToProductsButton = '[data-test=back-to-products]';
    infoText = '.complete-text';
    headerText = '.complete-header';
  
    verifyPageIsLoaded() {
        cy.url().should('include', completePageRoute);
    }

    verifyConfirmationMessage() {
        cy.contains(this.headerText, completeHeaderText).should('be.visible');
        cy.contains(this.infoText, completeInfoText).should('be.visible');
    }

    clickBackToProducts() {
        cy.get(this.backToProductsButton).click();
    }
}
  
export default CompletePage;