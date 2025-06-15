import { CartMenuItem, useCart } from "@/providers/cartContext";
import { useState } from "react";

type PendingItem = {
  item: Omit<CartMenuItem, "count">;
  restaurantId: string;
  quantity?: number;
};

export function useConfirmAddToCart() {
  const { cart, addToCart, clearCart } = useCart();
  const [pendingItem, setPendingItem] = useState<PendingItem | null>(null);
  const [pendingQuantity, setPendingQuantity] = useState<number>(1);
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const requestAddToCart = (
    item: Omit<CartMenuItem, "count">,
    restaurantId: string,
    quantity = 1
  ) => {
    if (
      cart.restaurantId &&
      cart.restaurantId !== restaurantId &&
      Object.keys(cart.items).length > 0
    ) {
      setPendingItem({ item, restaurantId });
      setPendingQuantity(quantity);
      setConfirmOpen(true);
    } else {
      addToCart(item, restaurantId, quantity);
    }
  };

  const confirmAdd = () => {
    if (pendingItem) {
      clearCart();
      addToCart(pendingItem.item, pendingItem.restaurantId, pendingQuantity);
    }
    setPendingItem(null);
    setPendingQuantity(1);
    setConfirmOpen(false);
  };

  const cancelAdd = () => {
    setPendingItem(null);
    setPendingQuantity(1);
    setConfirmOpen(false);
  };

  return {
    requestAddToCart,
    isConfirmOpen,
    confirmAdd,
    cancelAdd,
  };
}
