import { useConfirmAddToCart } from "@/hooks/use-cart";
import { useCart } from "@/providers/cartContext";
import { MenuItems } from "@/types/menuItem";
import { Promotions, PromotionType } from "@/types/promotions";
import { PlusIcon } from "lucide-react-native"; // или любая другая иконка
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import CounterButton from "../ui/Buttons/CounterButton";
import PrimaryButton from "../ui/Buttons/PrimaryButton";
import ConfirmDialog from "../ui/Dialogs/ConfirmDialog";
import Modal from "../ui/Modal";

type Props = {
  item: MenuItems | null;
  promotion?: Promotions;
  restaurantId: string;
  onClose: () => void;
};

export default function ProductModal({
  item,
  promotion,
  restaurantId,
  onClose,
}: Props) {
  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    isItemInCart,
  } = useCart();

  const { requestAddToCart, isConfirmOpen, confirmAdd, cancelAdd } =
    useConfirmAddToCart();

  const [quantity, setQuantity] = useState(1);
  const currentCount = item ? cart.items[item.id]?.count ?? 0 : 0;
  const [error, setError] = useState(false);

  useEffect(() => {
    setQuantity(1);
  }, [item]);

  if (!item) return null;

  const handleAddToCart = () => {
    requestAddToCart(item, restaurantId);
  };

  return (
    <Modal open={!!item} onClose={onClose} size="xl">
      <View className="flex-1 absolute">
        <ScrollView className="space-y-4 px-4 pt-4 pb-28">
          <View className="relative w-full h-64 rounded-xl overflow-hidden">
            <Image
              source={
                error
                  ? require("@/assets/placeholder-image.jpg")
                  : {
                      uri: `https://pub-96480823ba5d4f44bb4d8cd67febd2f1.r2.dev/${item.img_url}`,
                    }
              }
              onError={() => setError(true)}
              resizeMode="cover"
              className="w-full h-full rounded-xl"
            />

            {promotion && (
              <View
                className={`absolute top-2 left-2 px-3 py-1 rounded-lg z-10 ${
                  promotion.promotionType === PromotionType.DISCOUNT
                    ? "bg-red-600"
                    : promotion.promotionType === PromotionType.FREE_ITEM
                    ? "bg-green-600"
                    : "bg-gray-600"
                }`}
              >
                <Text className="text-white font-bold text-sm">
                  {promotion.promotionType === PromotionType.DISCOUNT &&
                    `Скидка ${promotion.discount}%`}
                  {promotion.promotionType === PromotionType.FREE_ITEM &&
                    `${promotion.requiredCount}+1`}
                </Text>
              </View>
            )}
          </View>
          <Text className="text-xl font-bold">{item.name}</Text>
          {promotion ? (
            <View className="flex-row space-x-2 items-center">
              <Text className="line-through text-gray-400">{item.price}p</Text>
              <Text className="text-blue-600 font-bold">
                {Math.round(item.price * (1 - promotion.discount / 100))}p
              </Text>
            </View>
          ) : (
            <Text className="text-base">{item.price}p</Text>
          )}
          <Text className="text-gray-500">{item.description}</Text>
          {item.rating !== null && (
            <View className="flex-row items-center space-x-2">
              <Text className="font-semibold">Рейтинг:</Text>
              <Text className="text-green-600 font-bold">{item.rating}</Text>
            </View>
          )}
          <View>
            <Text className="text-sm">
              Категория: <Text className="font-bold">{item.category.name}</Text>
            </Text>
            <Text className="text-sm">
              Доступность:{" "}
              <Text
                className={item.isAvailable ? "text-green-600" : "text-red-500"}
              >
                {item.isAvailable ? "В наличии" : "Нет в наличии"}
              </Text>
            </Text>
          </View>
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 bg-white px-4 py-3 border-t border-gray-200 mt-20">
          {isItemInCart(item.id) ? (
            <CounterButton
              count={currentCount}
              minusClick={() => decreaseQuantity(item.id)}
              plusClick={() => increaseQuantity(item.id)}
              deleteFromCart={() => removeFromCart(item.id)}
            />
          ) : (
            <View className="flex-row justify-between items-center">
              <View className="">
                <CounterButton
                  count={quantity}
                  minusClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  plusClick={() => setQuantity((q) => q + 1)}
                  deleteFromCart={() => {}}
                />
              </View>
              <View className=" ml-3 w-24">
                <PrimaryButton onPress={handleAddToCart} className="">
                  <PlusIcon width={20} height={20} color="white" />
                </PrimaryButton>
              </View>
            </View>
          )}
        </View>

        <ConfirmDialog
          open={isConfirmOpen}
          title="Блюдо из другого ресторана"
          message="Хотите сбросить текущее содержимое корзины и добавить данное блюдо в корзину?"
          onCancel={cancelAdd}
          onConfirm={confirmAdd}
        />
      </View>
    </Modal>
  );
}
