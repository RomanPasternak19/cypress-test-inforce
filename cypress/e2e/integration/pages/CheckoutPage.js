class CheckoutPage {
    
    continueButton = '[data-test=continue]';
  
    clickContinue() {
        cy.get('[data-test=continue]').click();
    }
}
  
export default CheckoutPage;