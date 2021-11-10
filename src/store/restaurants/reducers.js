import {combineReducers} from "redux";
import {
  STORE_RESTAURANTS,
  START_LOADING,
  SET_ERROR,
  ADD_RESTAURANT,
} from "./actions";

const records = (state = [], action) => {
  switch (action.type) {
    case STORE_RESTAURANTS:
      return action.records;
    case ADD_RESTAURANT:
      return [...state, action.record];
    default:
      return state;
  }
};

const loading = (state = false, action) => {
  switch (action.type) {
    case SET_ERROR:
    case STORE_RESTAURANTS:
      return false;
    case START_LOADING:
      return true;
    default:
      return state;
  }
};

const error = (state = false, action) => {
  switch (action.type) {
    case SET_ERROR:
      return true;
    case STORE_RESTAURANTS:
      return false;
    default:
      return state;
  }
};

export default combineReducers({records, loading, error});
