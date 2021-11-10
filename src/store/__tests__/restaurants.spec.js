import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import restaurantReducer from "../restaurants/reducers";
import {loadRestaurants, createRestaurant} from "../restaurants/actions";

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

  describe("Create restaurant action", () => {
    const newRestaurantName = "Burger Place";
    const existingRestaurant = {
      id: 1,
      name: "Pizza Place",
    };
    const responseRestaurant = {id: 2, name: "Burger Place"};

    let api;
    let store;

    beforeEach(() => {
      api = {
        createRestaurant: jest.fn().mockName("createRestaurant"),
      };

      const initialState = {records: [existingRestaurant]};

      store = createStore(
        restaurantReducer,
        initialState,
        applyMiddleware(thunk.withExtraArgument(api)),
      );
    });

    it("saves the restaurant to the server", () => {
      api.createRestaurant.mockResolvedValue(responseRestaurant);
      store.dispatch(createRestaurant(newRestaurantName));
      expect(api.createRestaurant).toHaveBeenCalledWith(newRestaurantName);
    });

    describe("when save succeeds", () => {
      beforeEach(() => {
        api.createRestaurant.mockResolvedValue(responseRestaurant);
        store.dispatch(createRestaurant(newRestaurantName));
      });

      it("adds the returned restaurant to the store", () => {
        expect(store.getState().records).toEqual([
          existingRestaurant,
          responseRestaurant,
        ]);
      });
    });
  });

  describe("on error", () => {
    it("sets an error flag", async () => {
      const api = {
        loadRestaurants: () => Promise.reject("Error"),
      };

      const initialState = {};

      const store = createStore(
        restaurantReducer,
        initialState,
        applyMiddleware(thunk.withExtraArgument(api)),
      );

      await store.dispatch(loadRestaurants());

      expect(store.getState().error).toEqual(true);
    });
    it("clears the error flag", async () => {
      const api = {
        loadRestaurants: () => Promise.resolve("no error"),
      };

      const initialState = {};

      const store = createStore(
        restaurantReducer,
        initialState,
        applyMiddleware(thunk.withExtraArgument(api)),
      );

      await store.dispatch(loadRestaurants());

      expect(store.getState().error).toEqual(false);
    });
    it("clears the loading flag", async () => {
      const api = {
        loadRestaurants: () => Promise.resolve("no error"),
      };

      const initialState = {};

      const store = createStore(
        restaurantReducer,
        initialState,
        applyMiddleware(thunk.withExtraArgument(api)),
      );

      await store.dispatch(loadRestaurants());
      expect(store.getState().loading).toEqual(false);
    });
  });
});
