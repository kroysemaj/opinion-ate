import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {devToolEnhancer} from "redux-devtools-extension";
import rootReducer from "./reducers";

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), devToolEnhancer()),
);

export default store;
