import React from "react";
import { Text } from "react-native";

export type ErrorField = string | { message?: string } | undefined;

export function ErrorMessage({ errorField }: { errorField?: ErrorField }) {
  const message =
    typeof errorField === "string"
      ? errorField
      : errorField?.message?.toString();

  if (!message) return null;

  return (
    <Text
      className="mt-1 text-red-600 text-sm"
      accessibilityRole="alert"
      accessible={true}
      testID="error-message"
    >
      {message}
    </Text>
  );
}
