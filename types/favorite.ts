import type { MenuItems } from "./menuItem";
import type { Restaurants } from "./restaurant";
import type { Users } from "./user";

export type Favorites = {
  id: string;
  createdAt: Date;
  user: Users;
  menuItem: MenuItems;
  restaurant: Restaurants;
};
