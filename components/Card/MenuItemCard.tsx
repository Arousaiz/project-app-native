import { useConfirmAddToCart } from "@/hooks/use-cart";
import { useAuth } from "@/providers/authContext";
import { useCart } from "@/providers/cartContext";
import { useFavorites } from "@/providers/favoritesContext";
import { Promotions, PromotionType } from "@/types/promotions";
import { BookmarkIcon, PlusIcon, StarIcon } from "lucide-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CounterButton from "../ui/Buttons/CounterButton";
import PrimaryButton from "../ui/Buttons/PrimaryButton";
import ConfirmDialog from "../ui/Dialogs/ConfirmDialog";

export default function ProductCard({
  menuItem,
  promotion,
  restaurantId,
  openReview,
  onClick,
  id,
}: {
  promotion?: Promotions;
  menuItem: any;
  restaurantId: string;
  openReview: () => void;
  onClick?: () => void;
  id: string;
}) {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    isItemInCart,
  } = useCart();
  const { requestAddToCart, isConfirmOpen, confirmAdd, cancelAdd } =
    useConfirmAddToCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { user } = useAuth();
  const showFavorites = user !== null;

  const isInCart = isItemInCart(menuItem.id);
  const isInFavorites = isFavorite(menuItem.id);
  const count = cart.items[menuItem.id]?.count ?? 0;

  const handleAddToCart = () => {
    requestAddToCart(menuItem, restaurantId);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onClick}
      className="bg-white rounded-xl my-2 overflow-hidden shadow-md"
      testID={id}
    >
      <View className="relative w-full aspect-[4/3]">
        <Image
          source={{
            uri: menuItem.image || "@/assets/placeholder-image.jpg",
          }}
          className="w-full h-full rounded-t-xl"
          resizeMode="cover"
        />

        {promotion && (
          <View
            className={`absolute top-2 left-2 px-2 py-1 rounded shadow-md z-10 ${
              promotion.promotionType === PromotionType.DISCOUNT
                ? "bg-red-600"
                : promotion.promotionType === PromotionType.FREE_ITEM
                ? "bg-green-600"
                : "bg-gray-600"
            }`}
          >
            <Text className="text-white font-semibold">
              {promotion.promotionType === PromotionType.DISCOUNT &&
                `Скидка ${promotion.discount}%`}
              {promotion.promotionType === PromotionType.FREE_ITEM &&
                `${promotion.requiredCount}+1`}
            </Text>
          </View>
        )}

        {showFavorites && (
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation?.();
              toggleFavorite(menuItem.id);
            }}
            className="absolute top-2 right-2 p-1"
          >
            <BookmarkIcon
              color={isInFavorites ? "#FBBF24" : "#9CA3AF"}
              size={24}
            />
          </TouchableOpacity>
        )}

        {menuItem.rating && (
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation?.();
              openReview();
            }}
            className="absolute bottom-2 left-2 bg-green-300 rounded-md px-3 py-1 flex-row items-center"
          >
            <Text className="font-bold text-black mr-1 select-none">
              {menuItem.rating}
            </Text>
            <StarIcon color="#000" size={16} />
          </TouchableOpacity>
        )}
      </View>

      <View className="p-3 min-h-[9rem] flex flex-col justify-between gap-2">
        <View>
          <Text className="font-bold text-base line-clamp-1 break-words">
            {menuItem.name}
          </Text>
          <Text className="text-gray-500 text-sm line-clamp-2 break-words mt-1">
            {menuItem.description}
          </Text>
        </View>

        <View className="flex-row justify-between items-center pt-2">
          <View>
            {promotion ? (
              <>
                <Text className="line-through text-gray-400">
                  {menuItem.price}p
                </Text>{" "}
                <Text className="text-primary font-bold">
                  {Math.round(menuItem.price * (1 - promotion.discount / 100))}p
                </Text>
              </>
            ) : (
              <Text>{menuItem.price}p</Text>
            )}
          </View>

          {isInCart ? (
            <CounterButton
              count={count}
              minusClick={() => decreaseQuantity(menuItem.id)}
              plusClick={() => increaseQuantity(menuItem.id)}
              deleteFromCart={() => removeFromCart(menuItem.id)}
            />
          ) : (
            <PrimaryButton
              size="icon"
              onPress={(e) => {
                e.stopPropagation?.();
                handleAddToCart();
              }}
              className="opacity-100 scale-100 transition-all duration-300 ease-in-out"
            >
              <PlusIcon size={24} />
            </PrimaryButton>
          )}
        </View>
      </View>

      <ConfirmDialog
        open={isConfirmOpen}
        title="Блюдо из другого ресторана"
        message="Хотите сбросить текущее содержимое корзины и добавить данное блюдо в корозину?"
        onCancel={cancelAdd}
        onConfirm={confirmAdd}
      />
    </TouchableOpacity>
  );
}
