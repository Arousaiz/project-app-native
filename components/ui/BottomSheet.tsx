import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type ModalPageProps = {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export default function BottomSheet({
  visible,
  onClose,
  children,
}: ModalPageProps) {
  const translateY = useRef(new Animated.Value(screenHeight)).current; // старт снизу за экраном
  const [showModal, setShowModal] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      Animated.timing(translateY, {
        toValue: 0, // поднимаем до 0 — значит модалка сверху на своём месте
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: screenHeight, // уезжаем вниз за экран
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowModal(false);
      });
    }
  }, [visible, translateY]);

  if (!showModal) return null;

  return (
    <Modal
      transparent
      visible={showModal}
      animationType="none"
      onRequestClose={onClose}
    >
      {/* затемнённый фон */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* Модалка снизу, на всю ширину */}
      <Animated.View
        style={[
          styles.modalContainer,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        {/* Хэндл (ручка сверху) */}
        <View style={styles.handle} />
        {children ? (
          children
        ) : (
          <>
            <Text style={styles.title}>Модальное окно растет снизу вверх</Text>
            <Text style={styles.content}>
              Тут может быть любой контент, который занимает всю ширину.
            </Text>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Закрыть</Text>
            </Pressable>
          </>
        )}
        {/* <Pressable style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Закрыть</Text>
        </Pressable> */}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    width: screenWidth,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
    // Чтобы модалка могла "расти", можешь задать минимальную высоту,
    // или высоту контента - тут просто пример
    minHeight: 300,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -3 },
    elevation: 10,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    marginBottom: 24,
  },
  closeButton: {
    backgroundColor: "#007aff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignSelf: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
