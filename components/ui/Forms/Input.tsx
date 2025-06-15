import { cn } from "@/utils/utils";
import React from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { ErrorField, ErrorMessage } from "./ErrorMessage";

type InputProps = TextInputProps & {
  error?: ErrorField;
  icon?: React.ReactNode;
  containerClassName?: string;
};

const InputBase = React.forwardRef<TextInput, InputProps>(
  ({ error, icon, style, containerClassName, ...rest }, ref) => {
    return (
      <View className={containerClassName}>
        <View className="relative">
          {icon && (
            <View className="absolute left-3 top-0 bottom-0 justify-center pointer-events-none">
              {icon}
            </View>
          )}
          <TextInput
            ref={ref}
            className={cn(
              "h-10 rounded-md bg-transparent border px-3 py-2 text-base text-black",
              icon && "pl-10",
              error && "border-red-600",
              !error && "border-gray-300"
            )}
            accessibilityHint={error ? "Ошибка ввода" : undefined}
            {...rest}
            style={style}
          />
        </View>
        <ErrorMessage errorField={error} />
      </View>
    );
  }
);

InputBase.displayName = "InputBase";

export default InputBase;
