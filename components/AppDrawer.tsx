import { CitySelector } from "@/components/citySelector";
import Search from "@/components/ui/Search";
import { useAuth } from "@/providers/authContext";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";

export default function AppDrawer() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <Drawer>
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Главная",
          title: "Главная",
          headerTitle: () => <CitySelector />,
          headerTitleAlign: "center",
          headerRight: () => <Search />,
        }}
      />

      <Drawer.Screen
        name="profile/index"
        options={{
          drawerLabel: "Профиль",
          title: "Мой профиль",
          drawerItemStyle: { display: user ? "flex" : "none" },
        }}
      />
      <Drawer.Screen
        name="profile/orders"
        options={{
          drawerLabel: "Мои заказы",
          title: "Заказы",
          drawerItemStyle: { display: user ? "flex" : "none" },
        }}
      />
      <Drawer.Screen
        name="profile/favorites"
        options={{
          drawerLabel: "Избранное",
          title: "Избранные",
          drawerItemStyle: { display: user ? "flex" : "none" },
        }}
      />
      <Drawer.Screen
        name="profile/edit"
        options={{
          drawerLabel: "Адрес",
          title: "Адрес",
          drawerItemStyle: { display: user ? "flex" : "none" },
        }}
      />
      <Drawer.Screen
        name="profile/reviews"
        options={{
          drawerLabel: "Отзывы",
          title: "Отзывы",
          drawerItemStyle: { display: user ? "flex" : "none" },
        }}
      />

      <Drawer.Screen
        name="login"
        options={{
          drawerLabel: "Войти",
          title: "Войти",
          drawerItemStyle: { display: user ? "none" : "flex" },
        }}
      />

      <Drawer.Screen
        name="logout"
        options={{
          drawerLabel: "Выйти",
          title: "Выйти",
          drawerItemStyle: { display: user ? "flex" : "none" },
        }}
      />

      <Drawer.Screen
        name="place-order"
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="order-success"
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Настройки",
          title: "Настройки",
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          drawerLabel: "О нас",
          title: "О приложении",
        }}
      />
    </Drawer>
  );
}
