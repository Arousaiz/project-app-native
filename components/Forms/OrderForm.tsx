import { OrderService } from "@/api/api.order";
import { CartState, useCart } from "@/providers/cartContext";
import { CreateOrder, CreateOrderItem, PaymentMethod } from "@/types/order";
import { showToast } from "@/utils/toast";
import { OrderSchema } from "@/zodScheme/orderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import InputBase from "../ui/Forms/Input";
import Label from "../ui/Forms/Label";

const paymentOptions = [
  { value: PaymentMethod.CASH, label: "Наличными" },
  { value: PaymentMethod.CARD, label: "Картой при получении" },
  { value: PaymentMethod.ONLINE, label: "Онлайн" },
];

export default function OrderForm({
  address,
  userId,
  totalPrice,
  setIsSubmittingOrder,
}: {
  address?: { city?: string; street?: string; house?: number } | null;
  userId: string;
  totalPrice: number;
  setIsSubmittingOrder: (boolean: boolean) => void;
}) {
  const { clearCart } = useCart();
  const router = useRouter();
  const { cart } = useCart();
  const [manual, setManual] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      address: {
        city: address?.city ?? "",
        street: address?.street ?? "",
        house: address?.house,
      },
      comment: "",
      paymentMethod: PaymentMethod.CASH,
      deliveryTime: new Date(),
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: (orderData: CreateOrder) => OrderService.createOrder(orderData),
    onSuccess: async () => {
      await clearCart();
      setTimeout(() => {
        router.push("/order-success");
      }, 0);
    },
    onError: (error: any) => {
      showToast("Произошла ошибка при создании заказа");
      console.error("Ошибка при создании заказа:", error);
    },
  });

  const onSubmit = (data: any) => {
    setIsSubmittingOrder(true);
    const toOrder = createOrderFromCart(cart, userId, data);
    createOrderMutation.mutate(toOrder);
  };

  const deliveryTime = watch("deliveryTime");

  return (
    <View className="p-4">
      <View className="mb-4">
        <Label>Город</Label>
        <InputBase
          placeholder="Гродно"
          defaultValue={address?.city}
          onChangeText={(text) => setValue("address.city", text)}
          error={errors.address?.city?.message}
        />
      </View>

      <View className="mb-4">
        <Label>Улица</Label>
        <InputBase
          placeholder="ул. Социалистическая"
          defaultValue={address?.street}
          onChangeText={(text) => setValue("address.street", text)}
          error={errors.address?.street?.message}
        />
      </View>

      <View className="mb-4">
        <Label>Дом</Label>
        <InputBase
          placeholder="12"
          defaultValue={address?.house?.toString() ?? ""}
          onChangeText={(text) => {
            const num = parseInt(text, 10);
            setValue("address.house", num);
          }}
          error={errors.address?.house?.message}
        />
      </View>

      <View className="my-4">
        <Text className="font-semibold mb-1 text-gray-800">Способ оплаты</Text>
        <Controller
          control={control}
          name="paymentMethod"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row flex-wrap gap-2 space-x-3">
              {paymentOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  className={`px-4 py-2 rounded-full border ${
                    value === option.value
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-300"
                  }`}
                  onPress={() => onChange(option.value)}
                >
                  <Text
                    className={`font-medium ${
                      value === option.value ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
      </View>

      <Controller
        control={control}
        name="comment"
        render={({ field: { onChange, value } }) => (
          <InputField
            label="Комментарий к заказу"
            placeholder="Ваше сообщение"
            multiline
            value={value || ""}
            onChangeText={onChange}
            error={errors.comment?.message}
          />
        )}
      />

      <View className="my-4">
        <Text className="font-semibold mb-2 text-gray-800">
          Желаемое время доставки
        </Text>
        <View className="flex-row mb-3 space-x-3">
          <TouchableOpacity
            className={`flex-1 py-3 rounded-md border border-blue-600 items-center ${
              !manual ? "bg-blue-600" : ""
            }`}
            onPress={() => setManual(false)}
          >
            <Text
              className={`font-semibold ${
                !manual ? "text-white" : "text-blue-600"
              }`}
            >
              Как можно скорее
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 rounded-md border border-blue-600 items-center ${
              manual ? "bg-blue-600" : ""
            }`}
            onPress={() => setManual(true)}
          >
            <Text
              className={`font-semibold ${
                manual ? "text-white" : "text-blue-600"
              }`}
            >
              Указать вручную
            </Text>
          </TouchableOpacity>
        </View>

        {manual && (
          <>
            <TouchableOpacity
              className="p-3 border border-gray-300 rounded-md items-center"
              onPress={() => setShowDatePicker(true)}
            >
              <Text className="text-base text-gray-800">
                {deliveryTime
                  ? deliveryTime.toLocaleString()
                  : "Выберите дату и время"}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={deliveryTime || new Date()}
                mode="datetime"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                minimumDate={new Date()}
                maximumDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(Platform.OS === "ios");
                  if (selectedDate) {
                    setValue("deliveryTime", selectedDate);
                  }
                }}
              />
            )}
          </>
        )}
      </View>

      <View className="flex-row justify-between my-4">
        <Text className="text-lg font-semibold text-gray-900">
          Сумма к оплате:
        </Text>
        <Text className="text-lg font-semibold text-gray-900">
          {totalPrice} руб.
        </Text>
      </View>

      <TouchableOpacity
        className="bg-blue-600 py-4 rounded-lg items-center"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white text-lg font-semibold">Оформить заказ</Text>
      </TouchableOpacity>
    </View>
  );
}

function InputField({
  label,
  error,
  multiline,
  ...props
}: {
  label: string;
  error?: string;
  multiline?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}) {
  return (
    <View className="mb-3 flex-1">
      <Text className="font-semibold mb-1 text-gray-800">{label}</Text>
      <TextInput
        className={`border border-gray-300 rounded-md p-2 text-base bg-white ${
          multiline ? "h-24 text-top" : ""
        }`}
        multiline={multiline}
        {...props}
      />
      {error && <Text className="text-red-600 mt-1">{error}</Text>}
    </View>
  );
}

function createOrderFromCart(
  cartState: CartState,
  userId: string,
  form: {
    address: { city: string; street: string; house: number };
    paymentMethod: PaymentMethod;
    deliveryTime: Date;
    comment: string;
  }
): CreateOrder {
  const orderItems: CreateOrderItem[] = Object.values(cartState.items).map(
    (item) => ({
      menuItemId: item.id,
      price: item.price,
      count: item.count,
    })
  );

  return {
    userId,
    restaurantId: cartState.restaurantId!,
    paymentMethod: form.paymentMethod,
    deliveryDetails: {
      address: form.address,
      deliveryTime: form.deliveryTime,
    },
    orderItems,
    comment: form.comment,
  };
}
