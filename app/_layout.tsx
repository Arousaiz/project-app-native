import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";

import { queryClient } from "@/api/api.config";
import AppDrawer from "@/components/AppDrawer";
import { AuthProvider } from "@/providers/authContext";
import { CartProvider } from "@/providers/cartContext";
import { FavoritesProvider } from "@/providers/favoritesContext";
import { getCity, saveCity } from "@/storage/city";
import { QueryClientProvider } from "@tanstack/react-query";

export default function Layout() {
  useEffect(() => {
    (async () => {
      const savedCity = await getCity();
      if (!savedCity) {
        await saveCity("Гродно");
      }
    })();
  }, []);

  const [queryClientToProvide] = useState(() => queryClient);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClientToProvide}>
        <CartProvider>
          <AuthProvider>
            <FavoritesProvider>
              <AppDrawer />
            </FavoritesProvider>
          </AuthProvider>
        </CartProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
