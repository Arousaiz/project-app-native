import type { Promotions } from "@/types/promotions";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function PromotionCard({
  promo,
  shouldWrapInLink = true,
  onClick,
}: {
  promo?: Promotions;
  shouldWrapInLink?: boolean;
  onClick?: () => void;
}) {
  const router = useRouter();
  const [error, setError] = useState(false);

  const handlePress = () => {
    if (shouldWrapInLink && promo?.restaurant?.id) {
      router.push(`/restaurant/${promo.restaurant.id}`);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      className="rounded-xl overflow-hidden bg-card shadow-sm"
    >
      <Image
        source={
          error
            ? require("@/assets/placeholder-image.jpg")
            : {
                uri: `https://pub-96480823ba5d4f44bb4d8cd67febd2f1.r2.dev/${promo?.img_url}`,
              }
        }
        onError={() => setError(true)}
        className="w-full h-40 object-cover"
        resizeMode="cover"
      />

      <View className="p-3">
        <Text className="font-bold text-base mb-1" numberOfLines={1}>
          {promo?.title || "нет названия"}
        </Text>
        <Text
          className="text-sm text-muted-foreground line-clamp-1"
          numberOfLines={2}
        >
          {promo?.description || "нет описания"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
