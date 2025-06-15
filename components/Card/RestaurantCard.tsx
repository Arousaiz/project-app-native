import { useRouter } from "expo-router";
import { StarIcon, TruckIcon } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";
import PrimaryBadge from "../ui/Badges/PrimaryBadge";
import { Card, CardContent, CardFooter } from "../ui/Card/Card";

export default function RestaurantCard({ restaurant }: { restaurant: any }) {
  const router = useRouter();
  const deliveryTime = Math.floor(Math.random() * (60 - 30 + 1)) + 30;

  return (
    <Pressable
      onPress={() => router.push(`/restaurant/${restaurant?.id}` as any)}
    >
      <Card>
        <Image
          source={require("@/assets/placeholder-image.jpg")}
          resizeMode="cover"
          className="w-full h-52 rounded-t-xl"
        />

        <CardContent className="pt-1">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="font-bold text-base flex-1" numberOfLines={1}>
              {restaurant?.name}
            </Text>
            <View className="flex-row items-center ml-2">
              <Text className="font-bold text-sm">
                {restaurant?.rating ?? "---"}
              </Text>
              <StarIcon size={16} color="gold" />
            </View>
          </View>

          <View className="flex-row items-center">
            <TruckIcon size={18} color="gray" />
            <Text className="ml-1 text-sm text-muted-foreground">
              {deliveryTime}~ минут
            </Text>
          </View>
        </CardContent>

        <CardFooter className="gap-2 py-1">
          <PrimaryBadge>Бесплатная доставка</PrimaryBadge>
        </CardFooter>
      </Card>
    </Pressable>
  );
}
