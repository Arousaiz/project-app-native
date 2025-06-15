import { MenuItems } from "@/types/menuItem";
import { Restaurants } from "@/types/restaurant";
import { Search } from "lucide-react-native";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import Modal from "../ui/Modal";

export default function SearchModal({
  query,
  isMobileSearchOpen,
  setIsMobileSearchOpen,
  setQuery,
  isLoading,
  results,
}: {
  query: string;
  isMobileSearchOpen: boolean;
  setIsMobileSearchOpen: (bool: boolean) => void;
  setQuery: (str: string) => void;
  isLoading: boolean;
  results?: {
    menuItems: MenuItems[];
    restaurants: Restaurants[];
  };
}) {
  return (
    <Modal
      open={isMobileSearchOpen}
      onClose={() => {
        setIsMobileSearchOpen(false);
        setQuery("");
      }}
      size="full"
    >
      <View className="bg-white rounded-xl p-4 max-h-[80%]">
        <View className="relative mb-3">
          <TextInput
            className="bg-gray-200 rounded-lg py-2 px-10 text-base text-black"
            placeholder="Введите ресторан или блюдо..."
            value={query}
            autoFocus
            onChangeText={setQuery}
            placeholderTextColor="#999"
          />
          <Search
            size={20}
            color="#999"
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              marginTop: -10,
            }}
          />
        </View>

        {isLoading && (
          <View className="flex-row items-center mb-3">
            <ActivityIndicator size="small" color="#999" />
            <Text className="ml-2 text-gray-500 text-sm">Поиск...</Text>
          </View>
        )}

        <FlatList
          keyboardShouldPersistTaps="handled"
          data={[
            ...(results?.restaurants || []),
            ...(results?.menuItems || []),
          ]}
          keyExtractor={(item) =>
            "address" in item ? `restaurant-${item.id}` : `menuItem-${item.id}`
          }
          ListEmptyComponent={
            !isLoading ? (
              <Text className="text-center text-gray-400 text-base mt-5">
                Ничего не найдено
              </Text>
            ) : null
          }
          renderItem={({ item }) =>
            "address" in item ? (
              <Pressable
                className="bg-teal-100 rounded-lg px-3 py-3 mb-2"
                onPress={() => {
                  setIsMobileSearchOpen(false);
                  setQuery("");
                }}
              >
                <Text className="font-semibold text-gray-800">{item.name}</Text>
                <Text className="text-gray-600 mt-1 text-sm">
                  {item.address?.city || ""}
                </Text>
              </Pressable>
            ) : (
              <Pressable
                className="bg-gray-200 rounded-lg px-3 py-3 mb-2"
                onPress={() => {
                  setIsMobileSearchOpen(false);
                  setQuery("");
                }}
              >
                <Text className="font-semibold text-gray-800">{item.name}</Text>
                <Text className="text-gray-600 mt-1 text-sm">
                  {item.restaurant?.name || ""}
                </Text>
              </Pressable>
            )
          }
        />
      </View>
    </Modal>
  );
}
