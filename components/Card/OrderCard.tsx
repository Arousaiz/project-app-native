import { OrderService } from "@/api/api.order";
import { Orders } from "@/types/order";
import { Reviews } from "@/types/review";
import { showToast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import React from "react";
import { Text, View } from "react-native";
import PrimaryButton from "../ui/Buttons/PrimaryButton";
import { Card } from "../ui/Card/Card";

export type OrderReceived = {
  id: string;
  restaurant: { id: string; name: string; reviews: Reviews[] };
  orderTime: string | Date;
  orderStatus: string;
  orderItems: {
    id: string;
    price: number;
    count: number;
    menuItem: {
      id: string;
      name: string;
      reviews: Reviews[];
    };
  }[];
  price: number;
  discount?: number;
  deliveryDetails?: { deliveryStatus: string };
};

export type OrderCardProps = {
  order: OrderReceived;
  setSelectedOrder: (order: Orders) => void;
};

const getOrderStatusStyle = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-600 text-white";
    case "accepted":
      return "bg-blue-500 text-white";
    case "placed":
      return "bg-yellow-500 text-black";
    case "cancelled":
      return "bg-red-600 text-white";
    case "returned":
      return "bg-gray-500 text-white";
    default:
      return "bg-gray-400 text-white";
  }
};

const getOrderStatusLabel = (status: string): string => {
  switch (status) {
    case "completed":
      return "Завершён";
    case "accepted":
      return "Принят";
    case "placed":
      return "Оформлен";
    case "cancelled":
      return "Отменён";
    case "returned":
      return "Возвращён";
    default:
      return status;
  }
};

const getDeliveryStatusStyle = (status: string) => {
  switch (status) {
    case "awaiting confirmation":
      return "bg-yellow-500 text-black";
    case "in transit":
      return "bg-blue-500 text-white";
    case "delivered":
      return "bg-green-600 text-white";
    case "cancelled":
      return "bg-red-600 text-white";
    case "returned":
      return "bg-gray-500 text-white";
    default:
      return "bg-gray-400 text-white";
  }
};

const getDeliveryStatusLabel = (status: string): string => {
  switch (status) {
    case "awaiting confirmation":
      return "Ожидает подтверждения";
    case "in transit":
      return "В пути";
    case "delivered":
      return "Доставлен";
    case "cancelled":
      return "Отменён";
    case "returned":
      return "Возвращён";
    default:
      return status;
  }
};

export default function OrderCard({ order, setSelectedOrder }: OrderCardProps) {
  const totalItemsPrice = order.orderItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  const deliveryCost = 0;
  const totalPrice = totalItemsPrice + deliveryCost;
  const discount = order.discount ?? 0;
  const finalPrice = totalPrice - discount;

  const hasRestaurantReview = order.restaurant.reviews?.length > 0;

  const hasAllMenuItemReviews = order.orderItems.every(
    (item) => item.menuItem.reviews?.length > 0
  );

  const shouldShowLeaveReviewButton =
    !hasRestaurantReview || !hasAllMenuItemReviews;

  const queryClient = useQueryClient();

  const cancelOrderMutation = useMutation({
    mutationFn: (id: string) => OrderService.cancelOrder(id),
    onSuccess: () => {
      showToast("Успешно отменен");
      queryClient.invalidateQueries({ queryKey: ["profileOrders"] });
    },
    onError: () => {
      showToast("Произошла ошибка при отмене заказа");
    },
  });

  const handleCancelOrder = () => {
    cancelOrderMutation.mutate(order.id);
  };

  const handleRateOrder = () => {
    setSelectedOrder(order as Orders);
  };

  return (
    <Card className="w-full md:w-9/12 mx-auto my-4 rounded-lg shadow p-4 space-y-4">
      <View className="flex-row justify-between items-start">
        <View>
          <Text className="font-bold text-lg">{order.restaurant.name}</Text>
          <Text className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(order.orderTime), {
              addSuffix: true,
              locale: ru,
            })}
          </Text>
        </View>
        <Text
          className={`text-sm px-3 py-1 rounded font-semibold capitalize ${getOrderStatusStyle(
            order.orderStatus
          )}`}
        >
          {getOrderStatusLabel(order.orderStatus)}
        </Text>
      </View>

      <View className="space-y-1 text-sm">
        {order.orderItems.map((item) => (
          <View key={item.id} className="flex-row justify-between">
            <Text className="text-gray-500">{item.menuItem.name}</Text>
            <Text>
              {item.price}p × {item.count}
            </Text>
          </View>
        ))}
      </View>

      <View className="border-t border-gray-300 pt-3 space-y-1 text-sm">
        <View className="flex-row justify-between">
          <Text className="text-gray-500">Продукты</Text>
          <Text>{totalItemsPrice}p</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-500">Доставка</Text>
          <Text>{deliveryCost}p</Text>
        </View>
        {discount > 0 && (
          <View className="flex-row justify-between">
            <Text className="text-green-700 font-medium">Скидка</Text>
            <Text className="text-green-700 font-medium">-{discount}p</Text>
          </View>
        )}
        <View className="flex-row justify-between">
          <Text className="font-semibold text-base">Итого</Text>
          <Text className="font-semibold text-base">{finalPrice}p</Text>
        </View>
      </View>

      {order.deliveryDetails?.deliveryStatus && (
        <View className="mt-2 flex-row items-center">
          <Text>Статус доставки: </Text>
          <Text
            className={`text-sm px-3 py-1 rounded font-semibold capitalize ${getDeliveryStatusStyle(
              order.deliveryDetails.deliveryStatus
            )}`}
          >
            {getDeliveryStatusLabel(order.deliveryDetails.deliveryStatus)}
          </Text>
        </View>
      )}

      <View className="pt-3 flex-row justify-end space-x-3">
        {order.orderStatus === "placed" && (
          <PrimaryButton variant="destructive" onPress={handleCancelOrder}>
            Отменить заказ
          </PrimaryButton>
        )}
        {order.orderStatus === "completed" && shouldShowLeaveReviewButton && (
          <PrimaryButton onPress={handleRateOrder}>Оценить заказ</PrimaryButton>
        )}
      </View>
    </Card>
  );
}
