import { Address, ProfileService } from "@/api/api.profile";
import { showToast } from "@/utils/toast";
import { addressSchema } from "@/zodScheme/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import type { z } from "zod";
import InputBase from "../ui/Forms/Input";
import Label from "../ui/Forms/Label";
import SubmitButton from "../ui/Forms/SubmitButton";

type FormData = z.infer<typeof addressSchema>;

export default function AddressForm({ address }: { address?: Address }) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      city: address?.city ?? "",
      street: address?.street ?? "",
      house: address?.house,
    },
  });

  useEffect(() => {
    register("city");
    register("street");
    register("house");
  }, [register]);

  const onSubmit = async (data: FormData) => {
    try {
      await ProfileService.editAddress(data);
      showToast("Успешно обновлено");
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <View className="p-4">
      <View className="mb-4">
        <Label>Город</Label>
        <InputBase
          placeholder="Гродно"
          defaultValue={address?.city}
          onChangeText={(text) => setValue("city", text)}
          error={errors.city?.message}
        />
      </View>

      <View className="mb-4">
        <Label>Улица</Label>
        <InputBase
          placeholder="ул. Социалистическая"
          defaultValue={address?.street}
          onChangeText={(text) => setValue("street", text)}
          error={errors?.street?.message}
        />
      </View>

      <View className="mb-4">
        <Label>Дом</Label>
        <InputBase
          placeholder="12"
          defaultValue={address?.house?.toString() ?? ""}
          onChangeText={(text) => {
            const num = parseInt(text, 10);
            setValue("house", num);
          }}
          error={errors?.house?.message}
        />
      </View>

      <View className="mt-5 w-1/2 self-center">
        <SubmitButton onPress={handleSubmit(onSubmit)}>Отправить</SubmitButton>
      </View>
    </View>
  );
}

function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null;
  return <Text className="text-red-500 mt-1">{message}</Text>;
}
