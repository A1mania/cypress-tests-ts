const executeUrl =
  "https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks?action=getData";

describe("API tests", () => {
 it("receive data sucessfully", () => {
    cy.request(executeUrl).then((response) => {
    expect(response.status).to.eq(200);
  });
  });

  it("Response body success message",  () => {
    cy.request(executeUrl).then((response) => {
    expect(response.body.message).to.eq("Success! Expected data received.");
  });
  });    

  it("Mock bad requests error 500", () => {
    cy.visit("https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks");
    cy.intercept("GET", executeUrl, { statusCode: 500 }).as("getData");

    cy.get("#fetchBtn").click();
    cy.wait("@getData").then((interception) => {
      expect(interception.response?.statusCode).to.eq(500);
      const message = cy.get("#result");
      message.should("have.text", "Network error");
    });
  });

  it("Mock bad requests error 400", () => {
    cy.visit("https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks");
    cy.intercept("GET", executeUrl, {
    statusCode: 400,
    body:  "Bad request",
  }).as("getData");

    cy.get("#fetchBtn").click();
    cy.wait("@getData").then((interception) => {
      expect(interception.response?.statusCode).to.eq(400);
      const message = cy.get("#result");
      message.should("have.text", "Network error");
    });
  });

  it("Mock bad requests error 404", () => {
    cy.visit("https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks");
   cy.intercept("GET", executeUrl, {
    statusCode: 404,
    body:  "Not found",
  }).as("getData");

    cy.get("#fetchBtn").click();
    cy.wait("@getData").then((interception) => {
      expect(interception.response?.statusCode).to.eq(404);
      const message = cy.get("#result");
      message.should("have.text", "Network error");
    });
  });

  it("Mock bad requests error 401", () => {
    cy.visit("https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks");
    cy.intercept("GET", executeUrl, {
    statusCode: 401,
    body:  "Unauthorized",
  }).as("getData");

    cy.get("#fetchBtn").click();
    cy.wait("@getData").then((interception) => {
      expect(interception.response?.statusCode).to.eq(401);
      const message = cy.get("#result");
      message.should("have.text", "Network error");
    });
  });
});