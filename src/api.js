import axios from "axios";

export const API_KEY = "v4JijKvrA2tZaATyJEKFIGZSFONwCcb4";

const client = axios.create({
  baseURL: `http://outside-in-dev-api.herokuapp.com/${API_KEY}`,
});

const api = {
  loadRestaurants() {
    return client.get("/restaurants").then(response => response.data);
  },
};

export default api;
