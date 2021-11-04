import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import restaurantReducer from "../restaurants/reducers";
import {loadRestaurants} from "../restaurants/actions";

describe("Restaurants", () => {
  describe("restaurant action", () => {
    it("store the restaurants", async () => {
      const records = [
        {id: 1, name: "Sushi Place"},
        {id: 2, name: "Pizza Place"},
      ];

      const api = {
        loadRestaurants: () => Promise.resolve(records),
      };

      const initialState = {
        records: [],
      };

      const store = createStore(
        restaurantReducer,
        initialState,
        applyMiddleware(thunk.withExtraArgument(api)),
      );

      await store.dispatch(loadRestaurants());

      expect(store.getState().records).toEqual(records);
    });
  });
});
