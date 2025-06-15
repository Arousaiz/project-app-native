import type { MenuItems } from "./menuItem";
import type { Restaurants } from "./restaurant";

export type Promotions = {
  id: string;
  img_url: string;
  title: string;
  description: string;
  promotionType: PromotionType;
  discount: number;
  requiredCount: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  restaurant: Restaurants;
  menuItem: MenuItems;
};

export enum PromotionType {
  FREE_ITEM = "free item",
  DISCOUNT = "discount",
}
