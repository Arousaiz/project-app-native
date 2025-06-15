import { RestaurantService } from "@/api/api.restaurant";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RestaurantInfoModal from "../Modals/RestauarantInfoModal";
import Modal from "../ui/Modal";
import ReviewCard from "./ReviewCard";

export default function RestaurantHeaderCard({ id }: { id: string }) {
  const [infoVisible, setInfoVisible] = useState(false);
  const [reviewsVisible, setReviewsVisible] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["restaurantInfo", id],
    queryFn: () => RestaurantService.findRestaurant(id),
    enabled: infoVisible,
  });

  const {
    data: reviewData,
    isLoading: isLoadingReviews,
    isError,
  } = useQuery({
    queryKey: ["restaurantReviews", id],
    queryFn: () => RestaurantService.fetchReviews(id),
    enabled: reviewsVisible,
  });

  return (
    <View className="p-4">
      <View className="relative rounded-3xl overflow-hidden aspect-[16/9] bg-gray-200 shadow-xl">
        <Image
          source={require("../../assets/placeholder-image.jpg")}
          className="w-full h-full object-cover"
          resizeMode="cover"
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="absolute bottom-4 left-4 right-4 flex-row gap-2"
        >
          <TouchableOpacity
            className="flex-row items-center bg-blue-600 px-4 py-2 rounded-xl mr-2"
            onPress={() => setInfoVisible(true)}
          >
            <Text className="text-white font-semibold mr-1">Информация</Text>
            <MaterialIcons name="info" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center bg-blue-600 px-4 py-2 rounded-xl mr-2"
            onPress={() => setReviewsVisible(true)}
          >
            <Text className="text-white font-semibold mr-1">Рейтинг</Text>
            <FontAwesome name="star" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center bg-blue-600 px-4 py-2 rounded-xl">
            <Text className="text-white font-semibold mr-1">Доставка</Text>
            <MaterialIcons name="local-shipping" size={20} color="white" />
          </TouchableOpacity>
        </ScrollView>
      </View>

      <RestaurantInfoModal
        open={infoVisible}
        onClose={() => setInfoVisible(false)}
        id={id}
      />

      <Modal open={reviewsVisible} onClose={() => setReviewsVisible(false)}>
        <View className="flex-1 bg-white p-5">
          <Text className="text-2xl font-bold text-center mb-5">
            Отзывы от пользователей
          </Text>

          {isLoadingReviews ? (
            <ActivityIndicator size="large" color="#000" className="mt-10" />
          ) : isError ? (
            <Text className="text-red-500 text-center mt-10">
              Ошибка при загрузке отзывов
            </Text>
          ) : reviewData?.data?.length ? (
            <ScrollView className="space-y-4">
              {reviewData.data.map((item) => (
                <ReviewCard key={item.id} review={item} />
              ))}
            </ScrollView>
          ) : (
            <Text className="text-xl font-bold text-center mt-10">
              Отзывы отсутствуют. Будьте первым!
            </Text>
          )}
        </View>
      </Modal>
    </View>
  );
}
