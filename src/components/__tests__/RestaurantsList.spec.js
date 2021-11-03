import {render} from "@testing-library/react";
import {RestaurantList} from "../RestaurantList";

describe("Restaurant List", () => {
  it("loads restaurants on the first render", () => {
    const loadRestaurants = jest.fn().mockName("loadRestaurants");

    render(<RestaurantList loadRestaurants={loadRestaurants} />);

    expect(loadRestaurants).toHaveBeenCalled();
  });
});
