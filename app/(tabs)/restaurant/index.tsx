import { RestaurantService } from "@/api/api.restaurant";
import PromotionCard from "@/components/Card/PromotionCard";
import RestaurantCard from "@/components/Card/RestaurantCard";
import PrimaryButton from "@/components/ui/Buttons/PrimaryButton";
import AppCarousel from "@/components/ui/Carousel/Carousel";
import { SkeletonCard } from "@/components/ui/Skeletons/skeletonCard";
import { getCity } from "@/storage/city";
import { Promotions } from "@/types/promotions";
import { Cuisines, Restaurants } from "@/types/restaurant";
import { ApiData } from "@/utils/query-utils";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FilterX, Settings2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const [city, setCity] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const savedCity = await getCity();
      setCity(savedCity);
    })();
  }, []);
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  const { data: promotions, isLoading: isLoadingPromotions } = useQuery<
    ApiData<Promotions>,
    AxiosError,
    Promotions[]
  >({
    queryKey: ["promotions", city],
    queryFn: () => RestaurantService.findPromotions(city!),
    select: (res) => res.data,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });

  const {
    data: restaurants,
    isLoading: isLoadingRestaurants,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery<
    ApiData<Restaurants>,
    AxiosError,
    Restaurants[],
    [string, string, string, string],
    number
  >({
    queryKey: ["restaurants", activeCategory, city!, sortBy],
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) =>
      RestaurantService.fetchRestaurants(
        pageParam.toString(),
        "10",
        city!,
        activeCategory,
        sortBy
      ),
    getNextPageParam: (lastPage) => {
      const { offset, limit, total_records } = lastPage.paginated;
      const nextOffset = offset + limit;
      return nextOffset < total_records ? nextOffset : undefined;
    },
    select: (data) => data.pages.flatMap((page) => page.data),
    staleTime: 1000 * 60 * 5,
    initialPageParam: 0,
  });

  const { data: cuisines, isLoading: isLoadingCuisines } = useQuery<
    ApiData<Cuisines>,
    AxiosError
  >({
    queryKey: ["cuisines"],
    queryFn: () => RestaurantService.fetchCuisines(),
    staleTime: 1000 * 60 * 10,
  });

  const skeletonData = Array.from({ length: 2 });
  const restaurantsData = restaurants ?? [];

  const numColumns = 1;

  const renderHeader = () => (
    <>
      {(isLoadingPromotions || (promotions?.length ?? 0) > 0) && (
        <View style={{ padding: 16 }}>
          <Text style={{ fontWeight: "bold", fontSize: 32 }}>Акции</Text>
          <View style={{ paddingVertical: 16 }}>
            {isLoadingPromotions ? (
              <AppCarousel
                data={skeletonData}
                renderItem={({ index }) => <SkeletonCard key={index} />}
              />
            ) : (
              <AppCarousel
                data={promotions ?? []}
                renderItem={({ item }) => <PromotionCard promo={item} />}
              />
            )}
          </View>
        </View>
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingVertical: 10,
          gap: 8,
          alignItems: "center",
        }}
      >
        <PrimaryButton variant="secondary" onPress={() => setOpen(true)}>
          <Settings2 />
        </PrimaryButton>

        <PrimaryButton
          variant="secondary"
          onPress={() => {
            setActiveCategory("");
            setSortBy("");
          }}
        >
          <FilterX />
        </PrimaryButton>

        {cuisines?.data.map(({ name, id }) => (
          <PrimaryButton
            key={id}
            onPress={() => setActiveCategory(name)}
            variant={activeCategory === name ? "primary" : "ghost"}
          >
            <Text style={{ textAlign: "center" }}>{name}</Text>
          </PrimaryButton>
        ))}
      </ScrollView>

      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 32, fontWeight: "bold", marginBottom: 16 }}>
          Рестораны
        </Text>
      </View>
    </>
  );

  return (
    <FlatList
      key={`flatlist-${numColumns}`}
      data={
        isLoadingRestaurants
          ? Array.from({ length: 8 }).map(() => null)
          : restaurantsData
      }
      keyExtractor={(item, index) =>
        isLoadingRestaurants
          ? index.toString()
          : item && item.id
          ? item.id.toString()
          : index.toString()
      }
      numColumns={1}
      renderItem={({ item }) =>
        isLoadingRestaurants ? (
          <SkeletonCard />
        ) : item ? (
          <RestaurantCard restaurant={item} />
        ) : null
      }
      contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 40 }}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={
        hasNextPage ? (
          <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
            {isFetchingNextPage ? (
              <ActivityIndicator size="large" color="#000" />
            ) : (
              <PrimaryButton onPress={() => fetchNextPage}>
                Загрузить ещё
              </PrimaryButton>
            )}
          </View>
        ) : null
      }
      showsVerticalScrollIndicator={true}
    />
  );
}
