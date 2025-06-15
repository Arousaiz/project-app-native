import { cn } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  View,
} from "react-native";

type Size = "sm" | "md" | "lg" | "xl" | "full";

const sizeHeights: Record<Size, string> = {
  sm: "h-[30%]",
  md: "h-[50%]",
  lg: "h-[70%]",
  xl: "h-[85%]",
  full: "h-full w-full mt-4",
};

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: Size;
  noBlur?: boolean;
}

export default function CustomModal({
  open,
  onClose,
  children,
  size = "lg",
  noBlur = false,
}: CustomModalProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setVisible(true);
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 50,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setVisible(false);
      });
    }
  }, [opacity, open, translateY]);

  if (!visible) return null;

  return (
    <Modal
      transparent
      animationType="none"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        className={cn(
          "absolute inset-0 z-10",
          noBlur ? "bg-transparent" : "bg-black/40"
        )}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 items-center justify-center z-20"
      >
        <Animated.View
          style={{
            opacity,
            transform: [{ translateY }],
          }}
          className={cn(
            "w-[90%] bg-white rounded-2xl p-5",
            sizeHeights[size],
            "shadow-xl relative"
          )}
        >
          <Pressable
            onPress={onClose}
            className="absolute top-3 right-3 z-30 p-1"
          >
            <Ionicons name="close" size={24} color="#333" />
          </Pressable>

          <View className="mt-8 flex-1">{children}</View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
