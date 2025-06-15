import { useCart } from "@/providers/cartContext";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";

export default function TabLayout() {
  const { totalItems } = useCart();

  function CartIconWithBadge({ color }: { color: string }) {
    return (
      <View style={{ width: 28, height: 28 }}>
        <Entypo name="shopping-cart" size={28} color={color} />
        {totalItems > 0 && (
          <View
            style={{
              position: "absolute",
              right: -6,
              top: -3,
              backgroundColor: "red",
              borderRadius: 8,
              width: 16,
              height: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 10,
                fontWeight: "bold",
              }}
              numberOfLines={1}
            >
              {totalItems > 99 ? "99+" : totalItems.toFixed(0)}
            </Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }}>
      <Tabs.Screen
        name="restaurant"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: "Help",
          tabBarIcon: ({ color }) => (
            <Entypo name="help-with-circle" size={28} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => <CartIconWithBadge color={color} />,
        }}
      />
    </Tabs>
  );
}
