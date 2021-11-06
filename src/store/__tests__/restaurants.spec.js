import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import restaurantReducer from "../restaurants/reducers";
import {loadRestaurants} from "../restaurants/actions";

describe("Restaurants", () => {
  describe("initially", () => {
    it("does not have the loading flag set", () => {
      const initialState = {};

      const store = createStore(
        restaurantReducer,
        initialState,
        applyMiddleware(thunk),
      );

      expect(store.getState().loading).toEqual(false);
    });
  });
  describe("when loading", () => {
    const records = [
      {id: 1, name: "Sushi Place"},
      {id: 2, name: "Pizza Place"},
    ];

    let store;

    beforeEach(() => {
      const api = {
        loadRestaurants: () => Promise.resolve(records),
      };

      const initialState = {};

      store = createStore(
        restaurantReducer,
        initialState,
        applyMiddleware(thunk.withExtraArgument(api)),
      );

      store.dispatch(loadRestaurants());
    });

    it("store the restaurants", () => {
      expect(store.getState().records).toEqual(records);
    });

    it("sets a loading flag", () => {
      const api = {
        loadRestaurants: () => new Promise(() => {}),
      };

      const initialState = {};

      store = createStore(
        restaurantReducer,
        initialState,
        applyMiddleware(thunk.withExtraArgument(api)),
      );

      store.dispatch(loadRestaurants());

      expect(store.getState().loading).toEqual(true);
    });

    it("clears a loading flag", () => {
      expect(store.getState().loading).toEqual(false);
    });
  });
});
