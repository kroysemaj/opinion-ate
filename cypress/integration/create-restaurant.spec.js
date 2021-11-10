import {API_KEY} from "../../src/api";

describe("Create restaurant", () => {
  it("allows adding a restaurant", () => {
    const resturantId = 27;
    const restaurantName = "Burger Place";

    cy.server({force404: true});
    cy.route({
      method: "GET",
      url: `https:outside-in-dev-api.herokuapp.com/${API_KEY}/restaurants`,
      response: [],
    });

    cy.route({
      method: "POST",
      url: `https:outside-in-dev-api.herokuapp.com/${API_KEY}/restaurants`,
      response: {
        id: resturantId,
        name: restaurantName,
      },
    }).as("addRestaurant");

    cy.visit("/");

    cy.get('[placeholder="Add Restaurant"]').type(restaurantName);
    cy.contains("Add").click();

    cy.wait("@addRestaurant").its("requestBody").should("deep equal", {
      name: restaurantName,
    });

    cy.contains(restaurantName);
  });
});
