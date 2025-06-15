import type { Categories } from "./category";
import type { Restaurants } from "./restaurant";
import type { Reviews } from "./review";

export type MenuItems = {
  id: string;
  img_url: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  isAvailable: boolean;
  category: Categories;
  restaurant: Restaurants;
  reviews: Reviews[];
};

export type MenuItemInfo = {
  id: string;
  name: string;
  description: string;
  rating: number;
  price: number;
  category: Categories;
  reviews: Reviews[];
};
