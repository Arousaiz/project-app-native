import type { CreateOrder, Orders } from "~/types/order";
import { instance } from "./api.config";
import type { ApiData } from "~/utils/query-utils";

export const OrderService = {
  fetchOrders(limit = 10, offset = 0): Promise<ApiData<Orders>> {
    return instance
      .get(`/profile/orders?limit=${limit}&offset=${offset}`)
      .then((res) => res.data);
  },

  createOrder(order: CreateOrder) {
    console.log("test");
    return instance.post(`/orders`, order).then((res) => res.data);
  },

  cancelOrder(id: string) {
    return instance.put(`orders/${id}/cancel`).then((res) => res.data);
  },
};
