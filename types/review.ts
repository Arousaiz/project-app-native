import type { MenuItems } from "./menuItem";
import type { Orders } from "./order";
import type { Restaurants } from "./restaurant";
import type { Users } from "./user";

export type Reviews = {
  id: string;
  text: string;
  rating: number;
  createdAt: Date;
  order: Orders;
  menuItem: MenuItems;
  restaurant: Restaurants;
  user: Users;
};
