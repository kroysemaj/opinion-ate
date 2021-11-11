import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {NewRestaurantForm} from "../NewRestaurantForm";

describe("New Restaurant Form", () => {
  const restaurantName = "Burger Place";

  let createRestaurant;
  let subject;

  beforeEach(() => {
    createRestaurant = jest.fn().mockName("createRestaurant");
    subject = render(<NewRestaurantForm createRestaurant={createRestaurant} />);
  });

  describe("when filled in", () => {
    beforeEach(async () => {
      createRestaurant.mockResolvedValue();
      const {getByPlaceholderText, getByTestId} = subject;

      await userEvent.type(
        getByPlaceholderText("Add Restaurant"),
        restaurantName,
      );
      userEvent.click(getByTestId("new-restaurant-submit"));
    });

    it("calls createRestaurant with the name", () => {
      expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
    });
    it("clears the form after save", () => {
      const {getByPlaceholderText} = subject;
      expect(getByPlaceholderText("Add Restaurant").value).toEqual("");
    });
  });
});
