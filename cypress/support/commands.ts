/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
Cypress.Commands.add('login', (email: string, password: string) => { 
    cy.get('#user-name').type(email); 
    cy.get('#password').type(password); 
    cy.get('#login-button').click(); })

Cypress.Commands.add('getSortingOptions', () => {
    return cy.get('.product_sort_container').then($select => {
        return Cypress.$.makeArray($select.find('option')).map(option => option.innerText);
    });
});

Cypress.Commands.add('openMenu', () => {
    cy.get('#react-burger-menu-btn').click();
});

Cypress.Commands.add('addToCartByIndex', (index: number) => {
cy.get('.btn_inventory').eq(index).click();
});
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
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>,
      getSortingOptions(): Chainable<string[]>;
      openMenu(): Chainable<void>;
      addToCartByIndex(index: number): Chainable<void>;
    //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
    //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
    //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}

export { }