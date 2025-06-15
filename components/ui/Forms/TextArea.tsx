import { cn } from "@/utils/utils";
import React from "react";
import { TextInput, View } from "react-native";
import { ErrorMessage } from "./ErrorMessage";

export type TextAreaProps = React.ComponentProps<typeof TextInput> & {
  error?: string;
};

const TextAreaBase = React.forwardRef<TextInput, TextAreaProps>(
  ({ error, className, numberOfLines = 4, ...rest }, ref) => {
    return (
      <View className="flex flex-col gap-1">
        <TextInput
          ref={ref}
          multiline
          numberOfLines={numberOfLines}
          textAlignVertical="top"
          className={cn(
            "w-full rounded-md bg-transparent text-sm outline-none border px-3 py-1.5 min-h-[100px]", // добавил min-h-[100px]
            "shadow-xs placeholder:text-muted-foreground sm:text-base",
            error
              ? "border-destructive text-destructive focus:ring-2 focus:ring-destructive"
              : "border-gray-300",
            className
          )}
          {...rest}
        />
        <ErrorMessage errorField={error} />
      </View>
    );
  }
);

TextAreaBase.displayName = "TextArea";

export default TextAreaBase;
