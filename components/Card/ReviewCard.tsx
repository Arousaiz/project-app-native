import { Reviews } from "@/types/review";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export default function ReviewCard({ review }: { review?: Reviews }) {
  const formattedDate = review?.createdAt
    ? new Date(review.createdAt).toLocaleString()
    : "";

  const itemName =
    review?.menuItem?.name ??
    (review?.restaurant?.name
      ? `${review.restaurant.name} (ресторан)`
      : "Без названия");

  return (
    <View className="w-full min-h-32 mx-auto my-3 rounded-lg shadow bg-white p-4">
      <View className="flex-row justify-between">
        <View className="flex-row items-center">
          <Text className="font-semibold text-base">{review?.rating}</Text>
          <FontAwesome name="star" size={14} color="#facc15" className="ml-1" />
        </View>

        <Text
          className="text-gray-500 font-medium text-sm ml-2"
          numberOfLines={1}
        >
          {formattedDate}
        </Text>
      </View>

      <Text className="font-bold mt-2 text-base" numberOfLines={1}>
        {itemName}
      </Text>

      <View className="mt-2">
        <Text className="text-sm text-gray-700" numberOfLines={6}>
          {review?.text}
        </Text>
      </View>
    </View>
  );
}
