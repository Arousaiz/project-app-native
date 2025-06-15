import { useCart } from "@/providers/cartContext";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import PrimaryButton from "../ui/Buttons/PrimaryButton";
import CartItem from "./CartItemCard";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  const router = useRouter();

  const itemsArray = Object.values(cart.items);
  const totalCount = itemsArray.reduce((acc, item) => acc + item.count, 0);

  const goToCheckout = () => {
    router.push("/place-order");
  };

  const handleClearCart = () => {
    Alert.alert(
      "Очистить корзину",
      "Вы уверены, что хотите очистить корзину?",
      [
        { text: "Отмена", style: "cancel" },
        { text: "Очистить", onPress: () => clearCart(), style: "destructive" },
      ]
    );
  };

  if (itemsArray.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-white rounded-xl p-6 shadow-md border border-gray-300">
        <Text className="text-3xl font-bold mb-4">Корзина пуста</Text>
        <Image
          source={require("../../assets/empty_cart.png")}
          className="w-40 h-40"
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white rounded-xl shadow-md border border-gray-300 overflow-hidden">
      <View className="flex-row justify-between items-center  p-4 ">
        <Text className="text-3xl font-bold">Корзина</Text>
        <PrimaryButton size="icon" onPress={handleClearCart}>
          <Entypo name="trash" size={24} color="white" />
        </PrimaryButton>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {itemsArray.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            count={item.count}
            minusClick={() => decreaseQuantity(item.id)}
            plusClick={() => increaseQuantity(item.id)}
            deleteFromCart={() => removeFromCart(item.id)}
          />
        ))}
      </ScrollView>

      <View className="p-6">
        <View className="flex-row justify-between mb-4">
          <Text className="text-white text-lg font-semibold">
            Всего товаров: {totalCount}
          </Text>
          <Text className="text-white text-2xl">{totalPrice} Р</Text>
        </View>
        <PrimaryButton onPress={goToCheckout} size="lg">
          <View className="flex-row flex justify-center items-center ">
            <Text className="text-primary-foreground text-lg mr-2 text-center">
              Продолжить
            </Text>
            <FontAwesome name="arrow-right" size={20} color="white" />
          </View>
        </PrimaryButton>
      </View>
    </View>
  );
}
