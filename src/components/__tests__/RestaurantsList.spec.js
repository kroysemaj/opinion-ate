import {render} from "@testing-library/react";
import {RestaurantList} from "../RestaurantList";

describe("Restaurant List", () => {
  const restaurants = [
    {id: 1, name: "Sushi Place"},
    {id: 2, name: "Pizza Place"},
  ];
  let loadRestaurants;
  let subject;

  beforeEach(() => {
    loadRestaurants = jest.fn().mockName("loadRestaurants");
    subject = render(
      <RestaurantList
        loadRestaurants={loadRestaurants}
        restaurants={restaurants}
      />,
    );
  });

  it("loads restaurants on the first render", () => {
    expect(loadRestaurants).toHaveBeenCalled();
  });

  it("displays the restaurants", () => {
    const {queryByText} = subject;

    expect(queryByText("Sushi Place")).not.toBeNull();
    expect(queryByText("Pizza Place")).not.toBeNull();
  });
});
