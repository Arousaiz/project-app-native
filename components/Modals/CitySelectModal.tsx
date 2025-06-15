import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import BottomSheet from "../ui/BottomSheet";

export const cities = [
  "Минск",
  "Гродно",
  "Витебск",
  "Брест",
  "Гомель",
  "Могилев",
];

type Props = {
  open: boolean;
  onClose: () => void;
  setCity: (city: string) => void;
  city: string | null;
  id?: string;
};

export default function CitySelectModal({
  open,
  onClose,
  setCity,
  city,
}: Props) {
  const handleSelect = async (name: string) => {
    await setCity(name);
    setCity(name);
    onClose();
  };

  return (
    <BottomSheet visible={open} onClose={onClose}>
      <View className="p-4">
        <Text className="text-xl font-semibold mb-4 text-center">
          Выберите город
        </Text>

        <ScrollView
          className="max-h-[50vh]"
          contentContainerStyle={{ paddingVertical: 8, gap: 8 }}
        >
          {cities.map((name) => {
            const isActive = city === name;

            return (
              <Pressable
                key={name}
                onPress={() => handleSelect(name)}
                className={`px-4 py-3 rounded-xl ${
                  isActive ? "bg-secondary" : "bg-gray-100"
                }`}
                android_ripple={{ color: "#ccc" }}
              >
                <Text
                  className={`text-base text-center ${
                    isActive ? "text-white font-bold" : "text-gray-800"
                  }`}
                >
                  {name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </BottomSheet>
  );
}
