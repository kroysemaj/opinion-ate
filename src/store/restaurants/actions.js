export const STORE_RESTAURANTS = "STORE_RESTAURANTS";
export const START_LOADING = "START_LOADING";
export const SET_ERROR = "SET_ERROR";

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
  console.log("error!");
  return {type: SET_ERROR};
};

const storeRestaurants = records => ({
  type: STORE_RESTAURANTS,
  records,
});
