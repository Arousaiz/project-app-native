import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { ProfileService } from "@/api/api.profile";
import ProductCard from "@/components/Card/MenuItemCard";
import { useFavorites } from "@/providers/favoritesContext";
import { Favorites } from "@/types/favorite";
import { useRouter } from "expo-router";

type GroupedFavorites = {
  [restaurantId: string]: {
    restaurant: {
      id: string;
      name: string;
    };
    items: Favorites[];
  };
};

function groupFavoritesByRestaurant(favorites: Favorites[]): GroupedFavorites {
  return favorites.reduce((acc, fav) => {
    const restId = fav.menuItem.restaurant.id;

    if (!acc[restId]) {
      acc[restId] = {
        restaurant: {
          id: restId,
          name: fav.menuItem.restaurant.name,
        },
        items: [],
      };
    }

    acc[restId].items.push(fav);

    return acc;
  }, {} as GroupedFavorites);
}

export default function ProfileFavorites() {
  const router = useRouter();
  const { favorites } = useFavorites();
  const [user, setUser] = useState<{ username?: string } | null>(null);
  const grouped = groupFavoritesByRestaurant(favorites);

  useEffect(() => {
    async function fetchUser() {
      const profile = await ProfileService.fetchProfile();
      setUser(profile);
    }
    fetchUser();
  }, []);

  return (
    <ScrollView className="flex-1 mt-10 px-4">
      <View className="flex flex-col space-y-6">
        {Object.values(grouped).map((group) => (
          <View key={group.restaurant.id}>
            <TouchableOpacity
              onPress={() =>
                router.push(`/restaurant/${group.restaurant.id}` as any)
              }
            >
              <Text className="text-xl font-bold text-blue-600 mb-2">
                {group.restaurant.name}
              </Text>
            </TouchableOpacity>
            <View className="flex-row flex-wrap justify-between">
              {group.items.map((item) => (
                <View key={item.id} className="w-1/2 p-2">
                  <ProductCard
                    openReview={() => {}}
                    menuItem={item.menuItem}
                    onClick={() => {}}
                    restaurantId={item.menuItem.restaurant.id}
                    id={item.id}
                  />
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
