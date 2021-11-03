import {Provider} from "react-redux";
import store from "./store";
import RestaurantScreen from "./components/RestaurantsScreen";

const App = () => (
  <Provider store={store}>
    <RestaurantScreen />
  </Provider>
);

export default App;
