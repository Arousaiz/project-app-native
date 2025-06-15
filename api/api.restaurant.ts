import { MenuItems } from "@/types/menuItem";
import { Promotions } from "@/types/promotions";
import { Cuisines, Restaurants } from "@/types/restaurant";
import { Reviews } from "@/types/review";
import { ApiData, ApiDataOne } from "@/utils/query-utils";
import { instance } from "./api.config";

export class RestaurantQuery {
  offset: string = "0";
  limit: string = "10";
  city: string = "Hrodna";
  constructor(params: { [k: string]: string }) {
    if (params?.offset) this.offset = params.offset;
    if (params?.limit) this.limit = params.limit;
  }
}

export const RestaurantService = {
  fetchRestaurants(
    offset: string = "0",
    limit: string = "10",
    city: string,
    category?: string,
    sortBy?: string,
    sortOrder?: "ASC" | "DESC"
  ) {
    const params = new URLSearchParams({
      limit,
      offset,
      city,
    });

    if (category) params.append("category", category);
    if (sortBy) params.append("sortBy", sortBy);
    if (sortOrder) params.append("sortOrder", sortOrder);

    console.log(params);

    return instance
      .get(`/restaurants/city?${params.toString()}`)
      .then((res) => res.data);
  },

  fetchCuisines(): Promise<ApiData<Cuisines>> {
    return instance.get(`/cuisine/all`).then((res) => res.data);
  },

  fetchReviews(id: string): Promise<ApiData<Reviews>> {
    return instance
      .get(`/restaurant/${id}/reviews?limit=${10}&offset=${0}`)
      .then((res) => res.data);
  },

  searchRestaurants(city: string, name: string) {
    return instance
      .get(`/restaurants/search?city=${city}&name=${name}`)
      .then((res) => res.data.data);
  },

  searchCombined(city: string, name: string) {
    return instance
      .get(`/search?city=${city}&name=${name}`)
      .then((res) => res.data.data);
  },

  findPromotions(city: string): Promise<ApiData<Promotions>> {
    return instance.get(`/promotions/all?city=${city}`).then((res) => res.data);
  },

  fetchMenuItems(id: string): Promise<ApiDataOne<Record<string, MenuItems[]>>> {
    return instance
      .get(`/restaurants/${id}/menu/grouped`)
      .then((res) => res.data);
  },

  fetchPromotionsById(id: string): Promise<ApiData<Promotions>> {
    return instance
      .get(`/restaurants/${id}/promotions?limit=${100}&offset=${0}&`)
      .then((res) => res.data);
  },

  findRestaurant(id: string): Promise<ApiDataOne<Restaurants>> {
    console.log("Test");
    return instance.get(`/restaurants/info/${id}`).then((res) => res.data);
  },
};
