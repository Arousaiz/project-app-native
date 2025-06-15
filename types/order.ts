import type { Addresses } from "./address";
import type { MenuItems } from "./menuItem";
import type { Restaurants } from "./restaurant";
import type { Users } from "./user";

export type Orders = {
  id: string;
  price: number;
  discount: number;
  comment: string;
  paymentMethod: PaymentMethod;
  orderStatus: OrderStatus;
  paymentId: string;
  orderTime: Date;
  deliveryDetails: DeliveryDetails;
  orderItems: OrderItems[];
  user: Users;
  restaurant: Restaurants;
};

export type CreateOrder = {
  userId: string;
  restaurantId: string;
  paymentMethod: PaymentMethod;
  deliveryDetails: CreateDeliveryDetails;
  orderItems: CreateOrderItem[];
  comment: string;
};

export type CreateOrderItem = {
  menuItemId: string;
  price: number;
  count: number;
};

export type CreateDeliveryDetails = {
  deliveryTime: Date;
  address: Omit<Addresses, "id">;
};

export type DeliveryDetails = {
  id: string;
  deliveryStatus: DeliveryStatus;
  deliveryTime: Date;
  ActualDeliveryTime: Date;
  address: Addresses;
};

export type OrderItems = {
  id: string;
  menuItemId: string;
  price: number;
  count: number;
  order: Orders;
  menuItem: MenuItems;
};

export declare enum DeliveryStatus {
  AWAITING_CONFIRMATION = "awaiting confirmation",
  IN_TRANSIT = "in transit",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  RETURNED = "returned",
}

export enum PaymentMethod {
  CASH = "cash",
  CARD = "card",
  ONLINE = "online",
}

export declare enum OrderStatus {
  PLACED = "placed",
  ACCEPTED = "accepted",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
  RETURNED = "returned",
}
