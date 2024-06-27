describe("burger constructor", () => {
  beforeEach(() => {
      window.localStorage.setItem(
          "refreshToken",
          "9c6916597579d527efbd7a1447ba6e1b331fc54114566a0005a17e36b43033943d90f7378431be8a"
      );
      window.localStorage.setItem(
          "accessToken",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGM2N2U2OTdlZGUwMDAxZDA2YjhiYiIsImlhdCI6MTcxOTQwNjUzNiwiZXhwIjoxNzE5NDA3NzM2fQ.ZqVj5Z1SowNC31Ys5y-lzjhl9F9TYz6WC29sD76fXIU"
      );
      cy.intercept("GET", "api/ingredients", {
          fixture: "ingredients.json",
      }).as("ingredients");
      cy.intercept("GET", "api/auth/user", {
          fixture: "user.json",
      });
      cy.intercept("POST", "api/auth/token", {
          fixture: "accessToken.json",
      });
      cy.intercept("POST", "api/orders", {
          fixture: "order.json",
      }).as("postOrder");
      cy.visit('.');
      cy.wait("@ingredients");
  });

  it("opens and closes modal with ingredient details", () => {
      cy.get('[data-test="bun"]').within(() => {
          cy.get('[data-test="content"]').children().eq(0).as("card");

          cy.get("@card")
              .should("contain", "Краторная булка N-200i")
              .and("contain", "1255")
              .find("img")
              .should(
                  "have.attr",
                  "src",
                  "https://code.s3.yandex.net/react/code/bun-02.png"
              );

          cy.get("@card").click();
      });

      cy.location("pathname").should(
          "equal",
          "/ingredients/643d69a5c3f7b9001cfa093c"
      );

      cy.get('[data-test="ingredient-details"]')
          .should("exist")
          .should("contain", "Краторная булка N-200i")
          .and("contain", "80")
          .and("contain", "24")
          .and("contain", "53")
          .and("contain", "420");

      cy.get('[data-test="close-button"]').click();
      cy.location("href").should("equal", "http://localhost:3000/");
  });

  it("add and delete ingredients in the constructor", () => {
    const dataTransfer = new DataTransfer();

    cy.get('[data-test="ingredients"]').find("a").as("ingredients");
    cy.get('[data-test="constructor"]').as("constructor");
    cy.get("@constructor").get('[data-test="total-price"]').as("totalPrice");
    cy.get("@constructor").get('[data-test="order-btn"]').as("submitBtn");

    // check initial state
    cy.get("@constructor")
        .should("exist")
    cy.get("@totalPrice").should("exist").and("contain", "0");
    cy.get("@submitBtn").should("be.disabled");

    // check drag and drop
    cy.get("@ingredients").eq(1).trigger("dragstart", {
        dataTransfer,
    });
    cy.get("@constructor")
        .trigger("drop", { dataTransfer })
        .should("contain", "Флюоресцентная булка R2-D3")
        .and("contain", "988");

    cy.get("@ingredients").eq(0).trigger("dragstart", {
        dataTransfer,
    });
    cy.get("@constructor")
        .trigger("drop", { dataTransfer })
        .should("contain", "Краторная булка N-200i")
        .and("contain", "1255");

    cy.get("@ingredients").eq(2).trigger("dragstart", {
        dataTransfer,
    });
    cy.get("@constructor").trigger("drop", { dataTransfer });
    cy.get("@ingredients").eq(4).trigger("dragstart", {
        dataTransfer,
    });
    cy.get("@constructor").trigger("drop", { dataTransfer });
    cy.get("@ingredients").eq(4).trigger("dragstart", {
        dataTransfer,
    });
    cy.get("@constructor").trigger("drop", { dataTransfer });
    cy.get("@ingredients").eq(5).trigger("dragstart", {
        dataTransfer,
    });
    cy.get("@constructor").trigger("drop", { dataTransfer });

    cy.get("@constructor")
        .should("contain", "Краторная булка N-200i")
        .and("contain", "1255")
        .should("contain", "Соус Spicy-X")
        .and("contain", "90")
        .should("contain", "Биокотлета из марсианской Магнолии")
        .and("contain", "424")
        .should("contain", "Филе Люминесцентного тетраодонтимформа")
        .and("contain", "988");

    cy.get("@constructor").within(() => {
        cy.get(".constructor-element").should("have.length", "6");

        cy.get(".constructor-element")
            .eq(1)
            .within(() => {
                cy.get(".constructor-element__action").find("svg").as("deleteBtn");
                cy.get("@deleteBtn").click();
            });

        cy.get(".constructor-element").should("have.length", "5");
    });

    cy.get("@constructor")
        .should("not.contain", "Соус Spicy-X")
        .and("not.contain", "90");
});
it("allows an authorized user to create an order", () => {
  const dataTransfer = new DataTransfer();

  cy.get('[data-test="ingredients"]').find("a").as("ingredients");
  cy.get('[data-test="constructor"]').as("constructor");
  cy.get("@constructor").get('[data-test="total-price"]').as("totalPrice");
  cy.get("@constructor").get('[data-test="order-btn"]').as("submitBtn");

  // check initial state
  cy.get("@constructor")
      .should("exist")
  cy.get("@totalPrice").should("exist").and("contain", "0");
  cy.get("@submitBtn").should("be.disabled");

  // check drag and drop
  cy.get("@ingredients").eq(1).trigger("dragstart", {
      dataTransfer,
  });
  cy.get("@constructor")
      .trigger("drop", { dataTransfer })
      .should("contain", "Флюоресцентная булка R2-D3")
      .and("contain", "988");

  cy.get("@ingredients").eq(0).trigger("dragstart", {
      dataTransfer,
  });
  cy.get("@constructor")
      .trigger("drop", { dataTransfer })
      .should("contain", "Краторная булка N-200i")
      .and("contain", "1255");

  cy.get("@ingredients").eq(2).trigger("dragstart", {
      dataTransfer,
  });
  cy.get("@constructor").trigger("drop", { dataTransfer });
  cy.get("@ingredients").eq(4).trigger("dragstart", {
      dataTransfer,
  });
  cy.get("@constructor").trigger("drop", { dataTransfer });
  cy.get("@ingredients").eq(4).trigger("dragstart", {
      dataTransfer,
  });
  cy.get("@constructor").trigger("drop", { dataTransfer });
  cy.get("@ingredients").eq(5).trigger("dragstart", {
      dataTransfer,
  });
  cy.get("@constructor").trigger("drop", { dataTransfer });

  cy.get("@constructor")
      .should("contain", "Краторная булка N-200i")
      .and("contain", "1255")
      .should("contain", "Соус Spicy-X")
      .and("contain", "90")
      .should("contain", "Биокотлета из марсианской Магнолии")
      .and("contain", "424")
      .should("contain", "Филе Люминесцентного тетраодонтимформа")
      .and("contain", "988");

  // check order's creation
  cy.contains('Оформить заказ').click();
  cy.get('[data-test="order-number"]').contains("777").should("exist");

  // check closing modal and initial state
  cy.get('[data-test="close-button"]').should("exist").click();
  cy.get('[data-test="order-details"]').should("not.exist");
  cy.get("@constructor")
      .should("exist")
  cy.get("@totalPrice").should("exist").and("contain", "0");
});

});
