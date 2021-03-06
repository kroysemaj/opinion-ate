import {render, act, getByTestId} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import flushPromises from "flush-promises";
import {NewRestaurantForm} from "../NewRestaurantForm";

describe("New Restaurant Form", () => {
  const restaurantName = "Burger Place";
  const requiredError = "Name is required";
  const serverError =
    "The restaurant could not be saved. Please try again later.";

  let createRestaurant;
  let subject;

  beforeEach(() => {
    createRestaurant = jest.fn().mockName("createRestaurant");
    subject = render(<NewRestaurantForm createRestaurant={createRestaurant} />);
  });

  describe("initially", () => {
    it("does not display a validation error", () => {
      const {queryByText} = subject;
      expect(queryByText(requiredError)).toBeNull();
    });

    it("does not display a server error", () => {
      const {queryByText} = subject;
      expect(queryByText(serverError)).toBeNull();
    });
  });

  describe("when filled in", () => {
    beforeEach(async () => {
      createRestaurant.mockResolvedValue();
      const {getByPlaceholderText, getByTestId} = subject;

      await userEvent.type(
        getByPlaceholderText("Add Restaurant"),
        restaurantName,
      );
      userEvent.click(getByTestId("new-restaurant-submit-button"));
      return act(flushPromises);
    });

    it("calls createRestaurant with the name", () => {
      expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
    });

    it("clears the form after save", () => {
      const {getByPlaceholderText} = subject;
      expect(getByPlaceholderText("Add Restaurant").value).toEqual("");
    });

    it("does not display a validation error", () => {
      const {queryByText} = subject;
      expect(queryByText(requiredError)).toBeNull();
    });

    it("does not display a server error", () => {
      const {queryByText} = subject;
      expect(queryByText(serverError)).toBeNull();
    });
  });

  describe("when empty", () => {
    beforeEach(async () => {
      createRestaurant.mockRejectedValue();

      const {getByPlaceholderText, getByTestId} = subject;
      await userEvent.type(getByPlaceholderText("Add Restaurant"), "");
      userEvent.click(getByTestId("new-restaurant-submit-button"));

      return act(flushPromises);
    });

    it("displays a validation error", () => {
      const {queryByText} = subject;
      expect(queryByText(requiredError)).not.toBeNull();
    });

    it("does not call create restaurant", () => {
      expect(createRestaurant).not.toHaveBeenCalled();
    });
  });

  describe("when correcting a validation error", () => {
    beforeEach(async () => {
      createRestaurant.mockResolvedValue();

      const {getByPlaceholderText, getByTestId} = subject;
      await userEvent.type(getByPlaceholderText("Add Restaurant"), "");
      userEvent.click(getByTestId("new-restaurant-submit-button"));

      await act(flushPromises);

      await userEvent.type(
        getByPlaceholderText("Add Restaurant"),
        restaurantName,
      );
      userEvent.click(getByTestId("new-restaurant-submit-button"));
      return act(flushPromises);
    });

    it("clears the validation error", () => {
      const {queryByText} = subject;
      expect(queryByText(requiredError)).toBeNull();
    });
  });

  xdescribe("when the store call fails", () => {
    beforeEach(async () => {
      createRestaurant.mockRejectedValueOnce();

      const {getByPlaceholderText, getByTestId} = subject;

      await userEvent.type(
        getByPlaceholderText("Add Restaurant", restaurantName),
      );
      userEvent.click(getByTestId("new-restaurant-submit-button"));

      return act(flushPromises);
    });

    it("displays a server error", () => {
      const {queryByText} = subject;
      expect(queryByText(serverError)).not.toBeNull();
    });

    it("does not clear the name", () => {
      const {getByPlaceholderText} = subject;
      expect(getByPlaceholderText("Add Restaurant").value).toEqual(
        restaurantName,
      );
    });
  });

  describe("when retrying after a server error", () => {
    beforeEach(async () => {
      createRestaurant.mockRejectedValueOnce().mockResolvedValueOnce();

      const {getByPlaceholderText, getByTestId} = subject;

      await userEvent.type(
        getByPlaceholderText("Add Restaurant", restaurantName),
      );
      userEvent.click(getByTestId("new-restaurant-submit-button"));
      await act(flushPromises);

      userEvent.click(getByTestId("new-restaurant-submit-button"));
      return act(flushPromises);
    });

    it("clears the server error", () => {
      const {queryByText} = subject;
      expect(queryByText(serverError)).toBeNull();
    });
  });
});
