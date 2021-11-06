import {useEffect} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import {connect} from "react-redux";
import {loadRestaurants} from "../store/restaurants/actions";

export const RestaurantList = ({
  loadRestaurants,
  restaurants,
  loading,
  error,
}) => {
  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);
  return (
    <>
      {error && (
        <Alert severity="error">An error occurred, what'd you do!?</Alert>
      )}
      {loading && <CircularProgress data-testid="loading-indicator" />}
      <List>
        {restaurants.map(restaurant => (
          <ListItem key={restaurant.id}>
            <ListItemText>{restaurant.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};

const mapStateToProps = state => ({
  restaurants: state.restaurants.records,
  loading: state.restaurants.loading,
  error: state.restaurants.error,
});

const mapDispatchToProps = {loadRestaurants};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
