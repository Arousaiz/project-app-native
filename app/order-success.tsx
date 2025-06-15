import { useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function OrderSuccessPage() {
  //   const { clearCart } = useCart();

  //   useEffect(() => {
  //     async function clear() {
  //       await clearCart();
  //     }
  //     clear();
  //   }, [clearCart]);

  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: ["profileOrders"] });

  return (
    <View className="flex-1 items-center justify-center p-4 bg-white">
      <View className="p-6 rounded-xl shadow-md max-w-md w-full items-center">
        <Text className="text-2xl font-bold text-green-600 mb-4 text-center">
          Заказ успешно оформлен!
        </Text>
        <Text className="mb-6 text-center">
          Спасибо за ваш заказ. Вы можете отследить его в личном кабинете.
        </Text>
        <Link
          href="/profile/orders"
          className="text-blue-600 underline font-medium"
        >
          Перейти в профиль
        </Link>
      </View>
    </View>
  );
}
