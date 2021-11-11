import {useState} from "react";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import {createRestaurant} from "../store/restaurants/actions";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export const NewRestaurantForm = ({createRestaurant}) => {
  const [name, setName] = useState("");
  const [validationError, setValidationError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();
    if (name) {
      setValidationError(false);
      setServerError(false);
      createRestaurant(name)
        .then(() => setName(""))
        .catch(() => setServerError(true));
    } else {
      setValidationError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {serverError && (
        <Alert severity="error">
          The restaurant could not be saved. Please try again later.
        </Alert>
      )}
      {validationError && <Alert severity="error">Name is required</Alert>}
      <Box display="flex" className={classes.root}>
        <TextField
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Add Restaurant"
          fullWidth
          variant="filled"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          data-testid="new-restaurant-submit-button"
        >
          Add
        </Button>
      </Box>
    </form>
  );
};

const mapStateToProps = null;
const mapDispatchToProps = {createRestaurant};

export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurantForm);
