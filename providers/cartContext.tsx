import { Categories } from "@/types/category";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

const CART_STORAGE_KEY = "cart";

const loadCartFromStorage = async (): Promise<CartState> => {
  try {
    const savedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (e) {
    console.warn("Failed to load cart from storage", e);
  }
  return {
    restaurantId: null,
    items: {},
  };
};

const initialCartState = {
  restaurantId: null,
  items: {},
};

export type CartMenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Categories;
  count: number;
};

type CartItemsMap = Record<string, CartMenuItem>;

export type CartState = {
  restaurantId: string | null;
  items: CartItemsMap;
};

type CartContextType = {
  cart: CartState;
  addToCart: (
    item: Omit<CartMenuItem, "count">,
    restaurantId: string,
    quantity?: number
  ) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  isItemInCart: (id: string) => boolean;
  totalPrice: number;
  totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type Action =
  | { type: "LOAD_CART_FROM_STORAGE"; payload: CartState }
  | {
      type: "ADD";
      item: Omit<CartMenuItem, "count">;
      restaurantId: string;
      quantity?: number;
    }
  | { type: "REMOVE"; id: string }
  | { type: "INCREASE"; id: string }
  | { type: "DECREASE"; id: string }
  | { type: "CLEAR" };

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "LOAD_CART_FROM_STORAGE":
      return action.payload;
    case "ADD": {
      if (state.restaurantId && state.restaurantId !== action.restaurantId) {
        return state;
      }
      const quantity = action.quantity ?? 1;
      const existing = state.items[action.item.id];
      return {
        restaurantId: action.restaurantId,
        items: {
          ...state.items,
          [action.item.id]: existing
            ? { ...existing, count: existing.count + quantity }
            : { ...action.item, count: quantity },
        },
      };
    }
    case "REMOVE": {
      const newItems = { ...state.items };
      delete newItems[action.id];
      const isEmpty = Object.keys(newItems).length === 0;
      return {
        restaurantId: isEmpty ? null : state.restaurantId,
        items: newItems,
      };
    }
    case "INCREASE": {
      const item = state.items[action.id];
      if (!item) return state;
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: { ...item, count: item.count + 1 },
        },
      };
    }
    case "DECREASE": {
      const item = state.items[action.id];
      if (!item || item.count <= 1) return state;
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: { ...item, count: item.count - 1 },
        },
      };
    }
    case "CLEAR":
      return {
        restaurantId: null,
        items: {},
      };
    default:
      return state;
  }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    (async () => {
      const savedState = await loadCartFromStorage();
      dispatch({ type: "LOAD_CART_FROM_STORAGE", payload: savedState });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        console.warn("Failed to save cart to storage", e);
      }
    })();
  }, [state]);

  const addToCart = (
    item: Omit<CartMenuItem, "count">,
    restaurantId: string,
    quantity = 1
  ) => {
    dispatch({ type: "ADD", item, restaurantId, quantity });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE", id });
  };

  const increaseQuantity = (id: string) => {
    dispatch({ type: "INCREASE", id });
  };

  const decreaseQuantity = (id: string) => {
    dispatch({ type: "DECREASE", id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  const isItemInCart = (id: string) => {
    return Boolean(state.items[id]);
  };

  const totalPrice = useMemo(() => {
    return Object.values(state.items).reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );
  }, [state]);

  const totalItems = useMemo(() => {
    return Object.values(state.items).reduce(
      (sum, item) => sum + item.count,
      0
    );
  }, [state]);

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        isItemInCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
