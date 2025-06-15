import type { Addresses } from "./address";
import type { MenuItemInfo, MenuItems } from "./menuItem";
import type { Promotions } from "./promotions";
import type { Reviews } from "./review";

export type Restaurants = {
  id: string;
  img_url: string;
  name: string;
  phone: string;
  openTime: Date;
  closeTime: Date;
  rating: number;
  cuisines: Cuisines[];
  menuItems: MenuItems[];
  promotions: Promotions[];
  reviews: Reviews[];
  address: Addresses;
};

export type Cuisines = {
  id: string;
  name: string;
  description: string;
};

export type RestaurantInfo = {
  id: string;
  img_url: string;
  name: string;
  cuisines: Cuisines[];
  phone: string;
  rating: string;
  operatingHours: string;
  address: Addresses;
  menuItems: MenuItemInfo[];
};

export type RestaurantCardInfo = {
  id: string;
  img_url: string;
  name: string;
  rating: number;
  openTime: Date;
  closeTime: Date;
  cuisines: Cuisines[];
};
