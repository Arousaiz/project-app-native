import { ProfileService, UserProfile } from "@/api/api.profile";
import CartItem from "@/components/Card/CartItemCard";
import OrderForm from "@/components/Forms/OrderForm";
import { useCart } from "@/providers/cartContext";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function PlaceOrderPage() {
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    ProfileService.fetchProfile()
      .then((res) => setUser(res))
      .catch(console.error);
  }, []);

  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  useEffect(() => {
    const isEmpty = Object.keys(cart.items).length === 0;
    if (isEmpty && !isSubmittingOrder) {
      router.replace("/restaurant");
    }
  }, [cart.items, router, isSubmittingOrder]);

  const itemsArray = Object.values(cart.items);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
      }}
    >
      <Text className="text-2xl font-bold mb-4">
        Страница оформления заказа
      </Text>

      <Text className="text-xl font-semibold mb-4">Ваш заказ</Text>

      <View className="mb-8">
        {itemsArray.length > 0 ? (
          <View className="space-y-4">
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
          </View>
        ) : (
          <Text className="text-gray-500 text-center">Корзина пуста</Text>
        )}
      </View>

      <View className="p-4 rounded-xl shadow-sm bg-white">
        <Text className="text-lg font-semibold mb-4">
          Заполните данные для оформления заказа
        </Text>
        <OrderForm
          totalPrice={totalPrice}
          userId={user?.id ?? ""}
          setIsSubmittingOrder={setIsSubmittingOrder}
        />
      </View>
    </ScrollView>
  );
}
