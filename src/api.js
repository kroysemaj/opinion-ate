import axios from "axios";

export const API_KEY = "v4JijKvrA2tZaATyJEKFIGZSFONwCcb4";
// export const API_KEY = "yourmom";

const client = axios.create({
  baseURL: `https://outside-in-dev-api.herokuapp.com/${API_KEY}`,
});

const api = {
  loadRestaurants() {
    return client.get("/restaurants").then(response => response.data);
  },
  createRestaurant(name) {
    return client.post("/restaurants", {name}).then(response => response.data);
  },
};

export default api;
