import {combineReducers} from "redux";
import {STORE_RESTAURANTS, START_LOADING} from "./actions";

const records = (state = [], action) => {
  switch (action.type) {
    case STORE_RESTAURANTS:
      return action.records;
    default:
      return state;
  }
};

const loading = (state = false, action) => {
  switch (action.type) {
    case STORE_RESTAURANTS:
      return false;
    case START_LOADING:
      return true;
    default:
      return state;
  }
};

export default combineReducers({records, loading});
