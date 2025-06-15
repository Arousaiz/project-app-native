import { RestaurantService } from "@/api/api.restaurant";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import Modal from "../ui/Modal";

const formatTime = (time: string) => time.slice(0, 5);

export default function RestaurantInfoModal({
  open,
  onClose,
  id,
}: {
  open: boolean;
  onClose: () => void;
  id: string;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["restaurantInfo", id],
    queryFn: () => RestaurantService.findRestaurant(id),
    enabled: open && !!id,
  });

  if (isLoading) {
    return (
      <Modal open={open} onClose={onClose}>
        <View className="flex-1 justify-center items-center bg-white">
          <ActivityIndicator size="large" color="#000" />
          <Text className="mt-4 text-lg">Загрузка...</Text>
        </View>
      </Modal>
    );
  }

  if (!data || isError) {
    return (
      <Modal open={open} onClose={onClose}>
        <View className="flex-1 justify-center items-center bg-white p-6">
          <Text className="text-red-500 text-center text-lg">
            Ошибка загрузки данных
          </Text>
        </View>
      </Modal>
    );
  }

  const restaurant = data.data;

  const workingHours = `${formatTime(
    restaurant.openTime.toString()
  )} - ${formatTime(restaurant.closeTime.toString())}`;

  return (
    <Modal open={open} onClose={onClose}>
      <ScrollView
        className="flex-1 bg-white p-6 space-y-6"
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <Text className="text-2xl font-bold text-center">
          {restaurant.name}
        </Text>
        <View className="border-t border-gray-300 w-1/2 self-center" />

        {/* Режим работы */}
        <View>
          <Text className="text-xl font-semibold text-center">
            Режим работы
          </Text>
          <View className="space-y-2 mt-2">
            {[
              "Понедельник",
              "Вторник",
              "Среда",
              "Четверг",
              "Пятница",
              "Суббота",
              "Воскресенье",
            ].map((day) => (
              <View key={day} className="flex-row justify-between ">
                <Text className="text-base">{day}</Text>
                <Text className="text-base text-right">{workingHours}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className=" border-gray-300 w-1/2 self-center" />

        {/* Адрес */}
        <View>
          <Text className="text-xl font-semibold text-center border-b">
            Адрес
          </Text>
          <Text className="text-center mt-1">
            {`${restaurant.address.city}, ${restaurant.address.street}, ${restaurant.address.house}`}
          </Text>
        </View>

        <View className="border-gray-300 w-1/2 self-center" />

        {/* Оплата */}
        <View>
          <Text className="text-xl font-semibold text-center border-b">
            Оплата
          </Text>
          <View className="flex-row justify-around flex-wrap gap-4 mt-4">
            <View className="items-center w-28">
              <MaterialIcons name="payment" size={40} color="#2563eb" />
              <Text className="text-center mt-1">Онлайн - картой</Text>
            </View>

            <View className="items-center w-28">
              <FontAwesome5 name="money-bill-wave" size={40} color="#16a34a" />
              <Text className="text-center mt-1">Наличными</Text>
            </View>

            <View className="items-center w-28">
              <Ionicons name="card-outline" size={40} color="#7c3aed" />
              <Text className="text-center mt-1">Картой при получении</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}
