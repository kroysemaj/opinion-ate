import {API_KEY} from "../../src/api";

describe("Listing Restaurants", () => {
  it("shows restaurants from the server", () => {
    const sushiPlace = "Sushi Place";
    const pizzaPlace = "Pizza Place";

    cy.server({force404: true});
    cy.route({
      method: "GET",
      url: `http://outside-in-dev-api.herokuapp.com/${API_KEY}/restaurants`,
      response: [
        {id: 1, name: sushiPlace},
        {id: 1, name: pizzaPlace},
      ],
    });

    cy.visit("/");
    cy.contains(sushiPlace);
    cy.contains(pizzaPlace);
  });
});
