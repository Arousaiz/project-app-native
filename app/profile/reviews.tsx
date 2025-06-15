import { ProfileService, UserProfile } from "@/api/api.profile";
import { ReviewService } from "@/api/api.review";
import ReviewCard from "@/components/Card/ReviewCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ProfileReviews() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    ProfileService.fetchProfile()
      .then((res) => setUser(res))
      .catch(console.error);
  }, []);

  const {
    data: reviews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["profileReviews"],
    queryFn: ({ pageParam = 0 }) => ReviewService.fetchReviews(50, pageParam),
    getNextPageParam: (lastPage) => {
      const { offset, limit, total_records } = lastPage.paginated;
      const nextOffset = offset + limit;
      return nextOffset < total_records ? nextOffset : undefined;
    },
    select: (data) => data.pages.flatMap((page) => page.data),
    staleTime: 1000 * 60 * 5,
    initialPageParam: 0,
  });

  if (!user) return <Text>Загрузка...</Text>;

  return (
    <View className="flex-1 p-4">
      {isLoading && <Text className="text-center my-4">Загрузка...</Text>}

      {reviews && reviews.length > 0 ? (
        <ScrollView className="flex-1">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
          {hasNextPage && (
            <TouchableOpacity
              onPress={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="bg-blue-600 py-3 px-6 rounded-md my-4 self-center"
            >
              <Text className="text-white text-center">
                {isFetchingNextPage ? "Загрузка..." : "Загрузить еще"}
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      ) : (
        !isLoading && (
          <Text className="text-center text-gray-500 my-4">
            Отзывов не найдено
          </Text>
        )
      )}
    </View>
  );
}
