import { ProfileService } from "@/api/api.profile";
import ProfileForm from "@/components/Forms/ProfileForm";
import { UserProfile } from "@/types/user";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";

export default function ProfileScreen() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    ProfileService.fetchProfile()
      .then((res) => setUser(res))
      .catch(console.error);
  }, []);

  if (!user) return <Text>Загрузка...</Text>;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text className="text-xl font-bold mb-6">Профиль: {user.username}</Text>
      <ProfileForm person={user} />
    </ScrollView>
  );
}
