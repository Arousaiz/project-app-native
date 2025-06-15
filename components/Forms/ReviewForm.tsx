import { ReviewService } from "@/api/api.review";
import { showToast } from "@/utils/toast";
import { CreateOrderReviewSchema } from "@/zodScheme/reviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import type { z } from "zod";

type Props = {
  order: {
    id: string;
    restaurant: { id: string; name: string };
    orderItems: { id: string; name: string }[];
  };
  onClose: () => void;
};

type FormData = z.infer<typeof CreateOrderReviewSchema>;

export default function OrderReviewForm({ order, onClose }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(CreateOrderReviewSchema),
    defaultValues: {
      orderId: order.id,
      restaurantReview: {
        restaurantId: order.restaurant.id,
        rating: 0,
        text: "",
      },
      dishReviews: order.orderItems.map((item) => ({
        menuItemId: item.id,
        rating: 0,
        text: "",
      })),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "dishReviews",
  });

  const restaurantRating = watch("restaurantReview.rating");
  const dishRatings = watch("dishReviews");

  const reviewMutation = useMutation({
    mutationFn: ReviewService.writeReview,
    onSuccess: () => {
      showToast("Отзыв успешно отправлен!");
      onClose();
    },
    onError: (error) => {
      showToast("Произошла ошибка при отправке отзыва");
      console.error("Ошибка при отправке отзыва:", error);
    },
  });

  const onSubmit = (data: FormData) => {
    reviewMutation.mutate(data);
  };

  return (
    <ScrollView className="p-4 bg-white">
      <View className="mb-6 border-b border-gray-300 pb-4">
        <Text className="text-lg font-semibold mb-2">
          Отзыв о ресторане {order.restaurant.name}
        </Text>

        <Text className="mb-1 text-sm">Текст отзыва</Text>
        <Controller
          control={control}
          name="restaurantReview.text"
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Ваш отзыв о ресторане"
              multiline
              className="border border-gray-300 rounded-md p-2 mb-1"
            />
          )}
        />
        {errors.restaurantReview?.text && (
          <Text className="text-red-500 text-sm mb-1">
            {errors.restaurantReview.text.message}
          </Text>
        )}

        <Text className="text-sm mb-1">Оценка</Text>
        <View className="flex-row space-x-1 mb-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setValue("restaurantReview.rating", star)}
            >
              <Text
                className={`text-2xl ${
                  restaurantRating >= star ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                ★
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.restaurantReview?.rating && (
          <Text className="text-red-500 text-sm">
            {errors.restaurantReview.rating.message}
          </Text>
        )}
      </View>

      <Text className="text-lg font-semibold mb-4">Отзывы о блюдах</Text>
      {fields.map((field, index) => {
        const dishRating = dishRatings?.[index]?.rating || 0;

        return (
          <View key={field.id} className="mb-6 border-b border-gray-300 pb-4">
            <Text className="font-medium mb-1">
              {order.orderItems[index].name}
            </Text>

            <Text className="mb-1 text-sm">Текст отзыва</Text>
            <Controller
              control={control}
              name={`dishReviews.${index}.text`}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Ваш отзыв о блюде"
                  multiline
                  className="border border-gray-300 rounded-md p-2 mb-1"
                />
              )}
            />
            {errors.dishReviews?.[index]?.text && (
              <Text className="text-red-500 text-sm mb-1">
                {errors.dishReviews[index]?.text?.message}
              </Text>
            )}

            <Text className="text-sm mb-1">Оценка</Text>
            <View className="flex-row space-x-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setValue(`dishReviews.${index}.rating`, star)}
                >
                  <Text
                    className={`text-2xl ${
                      dishRating >= star ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    ★
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.dishReviews?.[index]?.rating && (
              <Text className="text-red-500 text-sm">
                {errors.dishReviews[index]?.rating?.message}
              </Text>
            )}
          </View>
        );
      })}

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="bg-blue-600 mt-4 py-3 rounded-md"
      >
        <Text className="text-white text-center font-medium">
          Отправить отзывы
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
