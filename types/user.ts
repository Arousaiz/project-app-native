import type { Addresses } from "./address";
import type { Favorites } from "./favorite";
import type { Orders } from "./order";
import type { Reviews } from "./review";

export type Users = {
  id: string;
  imgUrl: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  username: string;
  hashedPassword: string;
  bonusPoints: number;
  isEmailVerified: boolean;
  userPreferences: UserPreferences;
  address: Addresses;
  favorites: Favorites[];
  reviews: Reviews[];
  orders: Orders[];
};

export type UserPreferences = {
  id: string;
  sendEmail: boolean;
  sendSMS: boolean;
  sendPush: boolean;
};

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  contactNumber: string;
  address: Addresses;
}
