import { ProfileService } from "@/api/api.profile";
import AddressForm from "@/components/Forms/AddressForm";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function ProfileAddressScreen() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profile = await ProfileService.fetchProfile();
        setUser(profile);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProfile();
  }, []);

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Загрузка...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }} className="flex-grow">
      <Text className="text-xl font-bold mb-6">Профиль: {user.username}</Text>
      <View className="w-full max-w-xl self-center">
        <AddressForm address={user.address} />
      </View>
    </ScrollView>
  );
}
