describe('open Swag Labs', () => {

 let testData: any; 

 beforeEach(() => {
  cy.fixture("data").then((data) => {
    testData = data;
  });
});

 beforeEach(() => {
     cy.visit('https://www.saucedemo.com/')
     cy.login('standard_user', 'secret_sauce');
     cy.url().should('include', 'inventory.html');
  })

    it('check inventory page title', () => { 
    cy.get('.title').should('have.text', 'Products')
    });

    it("check sorting options on the products page", () => {
    const sortingList = cy.getSortingOptions();
    sortingList.should('deep.equal', testData.products.sortingOptions);
  });

  it("burger menu opens on product page", () => {
    cy.openMenuIfClosed();
    cy.get(".bm-menu-wrap")
    .should("have.attr", "aria-hidden", "false");
});

    it("check counter appears on cart icon when add item to cart", async () => {
    cy.addToCartByIndex(0);
    cy.get(".shopping_cart_badge").should('have.text', '1');
  });

    it("check remove button appears after adding item to cart", async () => {
    cy.addToCartByIndex(0);
    cy.get(".inventory_list .inventory_item:first-child").should('contain.text', 'Remove');
  });
  })
