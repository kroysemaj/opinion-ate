export const STORE_RESTAURANTS = "STORE_RESTAURANTS";
export const START_LOADING = "START_LOADING";
export const SET_ERROR = "SET_ERROR";
export const ADD_RESTAURANT = "ADD_RESTAURANT";

export const loadRestaurants = () => (dispatch, getState, api) => {
  dispatch(startLoading());
  return api
    .loadRestaurants()
    .then(records => {
      dispatch(storeRestaurants(records));
    })
    .catch(err => dispatch(setError()));
};

const startLoading = () => ({type: START_LOADING});

const setError = () => {
  return {type: SET_ERROR};
};

const storeRestaurants = records => ({
  type: STORE_RESTAURANTS,
  records,
});

export const createRestaurant = name => (dispatch, getState, api) => {
  return api
    .createRestaurant(name)
    .then(record => {
      dispatch(addRestaurant(record));
    })
    .catch(() => {});
};

const addRestaurant = record => ({
  type: ADD_RESTAURANT,
  record,
});
