import {render} from "@testing-library/react";
import {RestaurantList} from "../RestaurantList";

describe("Restaurant List", () => {
  const restaurants = [
    {id: 1, name: "Sushi Place"},
    {id: 2, name: "Pizza Place"},
  ];
  let loadRestaurants;
  let subject;

  const renderWithProps = (propsOverrides = {}) => {
    const props = {
      loadRestaurants: jest.fn().mockName("loadRestaurants"),
      loading: false,
      restaurants,
      ...propsOverrides,
    };
    loadRestaurants = props.loadRestaurants;

    subject = render(<RestaurantList {...props} />);
  };

  it("loads restaurants on the first render", () => {
    renderWithProps();
    expect(loadRestaurants).toHaveBeenCalled();
  });

  it("displays the restaurants", () => {
    renderWithProps();
    const {queryByText} = subject;

    expect(queryByText("Sushi Place")).not.toBeNull();
    expect(queryByText("Pizza Place")).not.toBeNull();
  });

  describe("When loading", () => {
    it("displays the loading indicator while loading", () => {
      renderWithProps({loading: true});
      const {queryByTestId} = subject;
      expect(queryByTestId("loading-indicator")).not.toBeNull();
    });

    it("does not display the loading indicator while not loading", () => {
      renderWithProps();
      const {queryByTestId} = subject;
      expect(queryByTestId("loading-indicator")).toBeNull();
    });
  });
});
