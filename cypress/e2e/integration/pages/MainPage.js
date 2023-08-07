import {baseUrl, mainPageRoute, mainPageLogoText} from '../../../fixtures/test-data.json';

class MainPage {

    shoppingCartIcon = '.shopping_cart_badge';
    shoppingCartLink = '.shopping_cart_link';
    burgerMenuButton = '.bm-burger-button';
    logoutButton = '#logout_sidebar_link';

    verifyPageIsLoaded() {
        cy.url().should('eq', baseUrl + mainPageRoute);
        cy.get('body').should('be.visible');
        cy.contains(mainPageLogoText).should('be.visible');
    }

    verifyNumberOfItemsOnCartIcon(count) {
        cy.get(this.shoppingCartIcon).should('have.text', count.toString());
    }

    openShoppingCart() {
        cy.get(this.shoppingCartLink).click();
    }
    
    openBurgerMenu() {
        cy.get(this.burgerMenuButton).click();
    }

    clickLogout() {
        cy.get(this.logoutButton).click();
    }
}
  
export default MainPage;
  