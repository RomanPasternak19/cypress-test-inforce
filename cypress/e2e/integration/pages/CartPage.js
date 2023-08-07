class CartPage {
    
    cartItems = '.cart_item';
    checkoutButton = '[data-test=checkout]';
    totalPriceLebel = '.summary_total_label';
    finishButton = '[data-test=finish]';

    verifyCartItemsCount(count) {
        cy.get(this.cartItems).should('have.length', count);
    }
  
    verifyCartItemNames(items) {
        items.forEach(item => {
            cy.contains(this.cartItems, item).should('be.visible');
        });
    }
  
    clickCheckout() {
        cy.get(this.checkoutButton).click();
    }

    verifyTotalPriceWithTax(prices, tax) {
        const totalItemsPrice = Object.values(prices).reduce((total, price) => total + price, 0);
        const expectedTotalPrice = totalItemsPrice * (1 + tax);
    
        cy.get(this.totalPriceLebel).should('contain.text', 'Total: $' + expectedTotalPrice.toFixed(2));
    }

    submitCheckout() {
        cy.get(this.finishButton).click();
    }
}
  
export default CartPage;