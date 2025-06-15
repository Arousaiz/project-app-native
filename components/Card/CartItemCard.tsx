import React from "react";
import { Text, View } from "react-native";
import CounterButton from "../ui/Buttons/CounterButton";

type CartItemProps = {
  name: string;
  price: number;
  count: number;
  minusClick: () => void;
  plusClick: () => void;
  deleteFromCart: () => void;
};

export default function CartItem({
  name,
  price,
  count,
  minusClick,
  plusClick,
  deleteFromCart,
}: CartItemProps) {
  return (
    <View className="flex-row justify-between items-center border border-border rounded-lg p-3 mb-4 shadow-sm hover:shadow-md">
      <View className="flex-shrink">
        <Text className="text-base font-medium">{name}</Text>
        <Text className="text-sm text-gray-500">{price} руб.</Text>
      </View>
      <CounterButton
        count={count}
        minusClick={minusClick}
        plusClick={plusClick}
        deleteFromCart={deleteFromCart}
      />
    </View>
  );
}
