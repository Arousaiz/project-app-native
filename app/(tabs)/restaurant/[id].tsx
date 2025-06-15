import { RestaurantService } from "@/api/api.restaurant";
import ProductCard from "@/components/Card/MenuItemCard";
import PromotionCard from "@/components/Card/PromotionCard";
import RestaurantHeaderCard from "@/components/Card/RestaurantHeaderCard";
import PrimaryButton from "@/components/ui/Buttons/PrimaryButton";
import AppCarousel from "@/components/ui/Carousel/Carousel";
import { SkeletonCard } from "@/components/ui/Skeletons/skeletonCard";
import { MenuItems } from "@/types/menuItem";
import { Promotions } from "@/types/promotions";
import { ApiData, ApiDataOne } from "@/utils/query-utils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function RestaurantDetails() {
  const params = useLocalSearchParams();
  const restaurantId = Array.isArray(params.id)
    ? params.id[0]
    : params.id ?? null;

  const highlightId = Array.isArray(params.highlight)
    ? params.highlight[0]
    : params.highlight ?? null;
  const isScrollingProgrammatically = useRef(false);
  const categoryRefs = useRef<{ [key: string]: number }>({});
  const [activeCategory, setActiveCategory] = useState<string>("");
  const menuScrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (
      highlightId &&
      menuScrollViewRef.current &&
      categoryRefs.current[highlightId] !== undefined
    ) {
      const y = categoryRefs.current[highlightId];
      const timeout = setTimeout(() => {
        menuScrollViewRef.current?.scrollTo({
          y: y - 100,
          animated: true,
        });
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [highlightId]);

  const scrollToCategory = (category: string) => {
    if (!menuScrollViewRef.current) return;
    const y = categoryRefs.current[category];
    if (typeof y === "number") {
      isScrollingProgrammatically.current = true;
      menuScrollViewRef.current.scrollTo({ y: y - 50, animated: true });
      setActiveCategory(category);
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 500);
    }
  };

  const { data: promotions, isLoading: isLoadingPromotions } = useQuery<
    ApiData<Promotions>,
    AxiosError,
    Promotions[]
  >({
    queryKey: ["restaurantPromotions", restaurantId],
    queryFn: () => RestaurantService.fetchPromotionsById(restaurantId!),
    select: (res) => res.data,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });

  const {
    data: menu,
    isLoading: isLoadingMenu,
    isFetching,
    error,
  } = useQuery<
    ApiDataOne<Record<string, MenuItems[]>>,
    AxiosError,
    Record<string, MenuItems[]>
  >({
    queryKey: ["restaurants", restaurantId],
    queryFn: () => RestaurantService.fetchMenuItems(restaurantId!),
    select: (res) => res.data,
    placeholderData: keepPreviousData,
  });

  const skeletonData = Array.from({ length: 4 });

  const [sticky, setSticky] = useState(false);

  const onScrollMenu = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isScrollingProgrammatically.current) return;

    const scrollY = event.nativeEvent.contentOffset.y;

    setSticky(scrollY > 150);

    const offset = 60;
    const categories = Object.keys(categoryRefs.current);
    let currentCategory = activeCategory;

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const pos = categoryRefs.current[category];
      if (scrollY + offset >= pos) {
        currentCategory = category;
      }
    }

    if (currentCategory !== activeCategory) {
      setActiveCategory(currentCategory);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 60,
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 12,
          position: sticky ? "absolute" : "relative",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, alignItems: "center" }}
        >
          {menu &&
            Object.entries(menu).map(([category]) => (
              <PrimaryButton
                key={category}
                variant={activeCategory === category ? "primary" : "secondary"}
                onPress={() => scrollToCategory(category)}
              >
                <Text>{category}</Text>
              </PrimaryButton>
            ))}
        </ScrollView>
      </View>

      <ScrollView
        ref={menuScrollViewRef}
        contentContainerStyle={{
          paddingTop: sticky ? 60 : 0,
          paddingHorizontal: 16,
        }}
        onScroll={onScrollMenu}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        <RestaurantHeaderCard id={restaurantId}></RestaurantHeaderCard>
        {(isLoadingPromotions || (promotions?.length ?? 0) > 0) && (
          <View style={{}}>
            <Text style={{ fontWeight: "bold", fontSize: 32, padding: 16 }}>
              Акции
            </Text>
            <View style={{ paddingVertical: 16 }}>
              {isLoadingPromotions ? (
                <AppCarousel
                  data={skeletonData}
                  renderItem={({ index }) => <SkeletonCard key={index} />}
                />
              ) : (
                <AppCarousel
                  data={promotions ?? []}
                  renderItem={({ item }) => (
                    <PromotionCard promo={item} shouldWrapInLink={false} />
                  )}
                />
              )}
            </View>
          </View>
        )}
        {menu &&
          Object.entries(menu).map(([category, items]) => (
            <View
              key={category}
              onLayout={(event) => {
                const y = event.nativeEvent.layout.y;
                categoryRefs.current[category] = y;
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  paddingVertical: 12,
                }}
              >
                {category}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {items.map((item) => {
                  const promo = promotions?.find(
                    (p) => p.menuItem.id === item.id
                  );

                  return (
                    <View
                      key={item.id}
                      style={{
                        width: "48%",
                        marginBottom: 16,
                      }}
                    >
                      <ProductCard
                        id={item.id}
                        promotion={promo}
                        menuItem={item}
                        restaurantId={restaurantId}
                        openReview={() => {}}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}
