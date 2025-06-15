import { OrderService } from "@/api/api.order";
import { ProfileService, UserProfile } from "@/api/api.profile";
import OrderCard from "@/components/Card/OrderCard";
import ReviewModal from "@/components/Modals/reviewModal";
import PrimaryButton from "@/components/ui/Buttons/PrimaryButton";
import { Orders } from "@/types/order";
import { ApiData } from "@/utils/query-utils";
import { isNullOrUndefined } from "@/utils/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

const LIMIT = 10;

export default function ProfileOrders() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    ProfileService.fetchProfile()
      .then((res) => setUser(res))
      .catch(console.error);
  }, []);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<ApiData<Orders>, unknown, Orders[], [string], number>({
      queryKey: ["profileOrders"],
      queryFn: ({ pageParam = 0 }) =>
        OrderService.fetchOrders(LIMIT, pageParam),
      getNextPageParam: (lastPage) => {
        const { offset, limit, total_records } = lastPage.paginated;
        const nextOffset = offset + limit;
        return nextOffset < total_records ? nextOffset : undefined;
      },
      select: (data) => data.pages.flatMap((page) => page.data),
      staleTime: 1000 * 60 * 5,
      initialPageParam: 0,
    });

  const [selectedOrder, setSelectedOrder] = useState<Orders | undefined>(
    undefined
  );

  return (
    <View className="flex-1 max-w-7xl mx-auto mt-10 px-4">
      {isLoading && (
        <View className="items-center justify-center py-10">
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}

      {!isLoading && data && data.length > 0 ? (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex flex-col gap-4">
            {data.map((item) => (
              <OrderCard
                key={item.id}
                order={item}
                setSelectedOrder={setSelectedOrder}
              />
            ))}

            {hasNextPage && (
              <View className="mt-4 items-center">
                <PrimaryButton
                  onPress={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "Загрузка..." : "Показать ещё"}
                </PrimaryButton>
              </View>
            )}
          </View>
        </ScrollView>
      ) : (
        !isLoading && (
          <View className="py-10">
            <Text className="text-center text-gray-500">No orders found.</Text>
          </View>
        )
      )}

      <ReviewModal
        open={!isNullOrUndefined(selectedOrder)}
        onClose={() => setSelectedOrder(undefined)}
        order={selectedOrder}
      />
    </View>
  );
}
