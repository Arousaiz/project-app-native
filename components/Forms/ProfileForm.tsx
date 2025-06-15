import { ProfileService, UserProfile } from "@/api/api.profile";
import { profileSchema } from "@/zodScheme/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert, Text, View } from "react-native";
import { z } from "zod";
import InputBase from "../ui/Forms/Input";
import Label from "../ui/Forms/Label";
import SubmitButton from "../ui/Forms/SubmitButton";

type FormData = z.infer<typeof profileSchema>;

export default function ProfileForm({ person }: { person: UserProfile }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      id: person?.id ?? "",
      firstName: person?.firstName ?? "",
      lastName: person?.lastName ?? "",
      email: person?.email ?? "",
      contactNumber: person?.contactNumber ?? "",
    },
  });

  useEffect(() => {
    register("firstName");
    register("lastName");
    register("email");
    register("contactNumber");
  }, [register]);

  const onSubmit = async (data: FormData) => {
    try {
      await ProfileService.editInfo(data);
      Alert.alert("Успех", "Профиль успешно обновлён");
    } catch (err) {
      Alert.alert("Ошибка", "Произошла ошибка, попробуйте ещё раз");
    }
  };

  return (
    <View className="space-y-4">
      <View>
        <Label>Имя</Label>
        <InputBase
          className="border px-3 py-2 rounded"
          placeholder="Имя"
          defaultValue={person?.firstName}
          onChangeText={(text) => setValue("firstName", text)}
          error={errors.firstName}
        />
      </View>

      <View>
        <Label>Фамилия</Label>
        <InputBase
          className="border px-3 py-2 rounded"
          placeholder="Фамилия"
          defaultValue={person?.lastName}
          onChangeText={(text) => setValue("lastName", text)}
          error={errors.lastName?.message}
        />
      </View>

      <View>
        <Label>Почта</Label>
        <InputBase
          className="border px-3 py-2 rounded"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="example@gmail.com"
          defaultValue={person?.email}
          onChangeText={(text) => setValue("email", text)}
          error={errors.email?.message}
        />
      </View>

      <View>
        <Label>Телефон</Label>
        <InputBase
          className="border px-3 py-2 rounded"
          keyboardType="phone-pad"
          placeholder="+375-11-33-11-369"
          defaultValue={person?.contactNumber}
          onChangeText={(text) => setValue("contactNumber", text)}
          error={errors.contactNumber?.message}
        />
      </View>

      <View className="mt-4">
        <SubmitButton onPress={handleSubmit(onSubmit)}>
          <Text>Отправить</Text>
        </SubmitButton>
      </View>
    </View>
  );
}
