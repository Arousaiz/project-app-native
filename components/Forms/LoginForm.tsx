import { useAuth } from "@/providers/authContext";
import { authSchema } from "@/zodScheme/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";
import InputBase from "../ui/Forms/Input";
import SubmitButton from "../ui/Forms/SubmitButton";

const formSchema = authSchema.pick({
  username: true,
  password: true,
});

type FormData = z.infer<typeof formSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await login(data);
      router.push("/profile");
    } catch (err) {
      console.warn("Ошибка входа", err);
      //   showToast("Произошла ошибка, попробуйте ещё раз");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="w-full px-6 py-4 space-y-6">
      <View>
        <Text className="text-base font-medium text-gray-700">
          Имя пользователя
        </Text>
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <InputBase
              className="mt-2 border border-gray-300 rounded-lg p-3 text-base"
              placeholder="Введите имя"
              value={field.value}
              onChangeText={field.onChange}
              autoCapitalize="none"
              error={errors.username?.message}
            />
          )}
        />
      </View>

      <View>
        <View className="flex-row justify-between items-center">
          <Text className="text-base font-medium text-gray-700">Пароль</Text>
          <TouchableOpacity
            onPress={() => router.push("RestorePassword" as never)}
          >
            <Text className="text-blue-600 text-sm underline">
              Забыли пароль?
            </Text>
          </TouchableOpacity>
        </View>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <InputBase
              className="mt-2 border border-gray-300 rounded-lg p-3 text-base"
              placeholder="Введите пароль"
              secureTextEntry
              value={field.value}
              onChangeText={field.onChange}
              error={errors.password?.message}
            />
          )}
        />
      </View>

      <SubmitButton
        className="bg-blue-600 rounded-lg p-4 items-center"
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        <Text className="text-white font-semibold text-base">
          {loading ? "Входим..." : "Войти"}
        </Text>
      </SubmitButton>
    </View>
  );
}
