import LoginForm from "@/components/Forms/LoginForm";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center px-6">
      <View className="items-center">
        <Text className="text-xl font-semibold mt-10 text-center">
          Войдите в ваш аккаунт
        </Text>
      </View>

      <View className="mt-10">
        <LoginForm />

        <Text className="text-center text-sm text-gray-700 mt-10">
          Ещё не зарегистрированы?{" "}
          <Text
            className="text-blue-600 underline"
            onPress={() => router.push("Register" as never)}
          >
            Создайте новый аккаунт
          </Text>
        </Text>
      </View>
    </View>
  );
}
