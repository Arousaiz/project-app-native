import React from "react";
import { Modal, Text, View } from "react-native";
import PrimaryButton from "../Buttons/PrimaryButton";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View className="flex-1 bg-black bg-opacity-50 justify-center items-center p-4">
        <View className="bg-white rounded-md p-6 w-full max-w-md">
          <Text className="text-lg font-bold mb-4">{title}</Text>
          <Text className="mb-6 text-base">{message}</Text>
          <View className="flex-row justify-end space-x-4">
            <PrimaryButton
              variant="ghost"
              onPress={onCancel}
              className="px-4 py-2"
            >
              Отмена
            </PrimaryButton>
            <PrimaryButton
              variant="destructive"
              onPress={onConfirm}
              className="px-4 py-2"
            >
              Подтвердить
            </PrimaryButton>
          </View>
        </View>
      </View>
    </Modal>
  );
}
