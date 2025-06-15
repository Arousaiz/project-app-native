import { Minus, Plus } from "lucide-react-native";
import React from "react";
import { Pressable, TextInput, View } from "react-native";

type CounterButtonProps = {
  count: number;
  minusClick: () => void;
  plusClick: () => void;
  deleteFromCart: () => void;
  className?: string;
  buttonClassName?: string;
  inputClassName?: string;
};

export default function CounterButton({
  count,
  minusClick,
  plusClick,
  deleteFromCart,
  className = "",
  buttonClassName = "",
  inputClassName = "",
}: CounterButtonProps) {
  return (
    <View
      className={`flex flex-row items-center max-w-[120px] rounded-lg overflow-hidden ${className}`}
    >
      <PlusMinusButton
        onPress={plusClick}
        className={`rounded-l-lg ${buttonClassName}`}
      >
        <Plus size={24} />
      </PlusMinusButton>
      <View
        style={{
          width: 40,
          height: 32,
          justifyContent: "center",
          alignItems: "center",
        }}
        className="bg-secondary"
      >
        <TextInput
          editable={false}
          value={count.toString()}
          keyboardType="numeric"
          className={`text-secondary-foreground text-center ${inputClassName}`}
          style={{
            textAlign: "center",
            textAlignVertical: "center",
            padding: 0,
            margin: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </View>
      <PlusMinusButton
        onPress={() => {
          if (count === 1) {
            deleteFromCart();
          } else {
            minusClick();
          }
        }}
        className={`rounded-r-lg ${buttonClassName}`}
      >
        <Minus size={24} />
      </PlusMinusButton>
    </View>
  );
}

function PlusMinusButton({
  children,
  onPress,
  className,
}: {
  children: React.ReactNode;
  onPress: () => void;
  className?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`h-9 w-9 justify-center items-center bg-secondary ${className}`}
      android_ripple={{ color: "#ccc" }}
    >
      {children}
    </Pressable>
  );
}
