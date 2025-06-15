import type { Promotions } from "@/types/promotions";
import { useNavigation } from "@react-navigation/native";
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
  const navigation = useNavigation<any>();

  const handlePress = () => {
    if (shouldWrapInLink && promo?.restaurant?.id) {
      navigation.navigate("restaurant", { id: promo.restaurant.id });
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      className="rounded-xl overflow-hidden bg-accent shadow-sm"
    >
      <Image
        source={
          promo?.img_url
            ? { uri: promo.img_url }
            : require("@/assets/placeholder-image.jpg")
        }
        className="w-full h-40 object-cover"
        resizeMode="cover"
      />

      <View className="p-3">
        <Text className="font-bold text-base mb-1" numberOfLines={1}>
          {promo?.title || "нет названия"}
        </Text>
        <Text className="text-sm text-muted-foreground" numberOfLines={2}>
          {promo?.description || "нет описания"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
