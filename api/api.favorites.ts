import axios from "axios";
import { instance } from "./api.config";

export const FavoritesService = {
  fetchFavorites() {
    return axios
      .get("http://10.130.3.76:3000/user/favorites?limit=100&offset=0", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => res.data.data)
      .catch((error) => {
        console.log(error);
        return [];
      });
  },

  createFavorite({
    menuItemId,
    restaurantId,
  }: {
    menuItemId: string;
    restaurantId?: string;
  }) {
    return instance
      .post(`/user/favorites`, {
        menuItemId,
        restaurantId,
      })
      .then((res) => res.data);
  },

  deleteFavorite(id: string) {
    return instance.delete(`/user/favorites/${id}`).then((res) => res.data);
  },
};
