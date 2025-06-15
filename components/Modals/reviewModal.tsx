import { Orders } from "@/types/order";
import { Pressable, Text, View } from "react-native";
import ReviewForm from "../Forms/ReviewForm";
import Modal from "../ui/Modal"; // твой кастомный модальный компонент

type Props = {
  open: boolean;
  onClose: () => void;
  order?: Orders;
};

export default function ReviewModal({ open, onClose, order }: Props) {
  if (!open || !order) return null;

  const dto = {
    id: order.id,
    restaurant: {
      id: order.restaurant.id,
      name: order.restaurant.name,
    },
    orderItems: order.orderItems.map((item) => ({
      id: item.menuItem.id,
      name: item.menuItem.name,
    })),
  };

  return (
    <Modal open={open} onClose={onClose}>
      <View className="bg-white rounded-2xl w-[90%] max-h-[90%] p-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-semibold">Оставьте отзыв</Text>
          <Pressable onPress={onClose}>
            <Text className="text-xl text-gray-400">✕</Text>
          </Pressable>
        </View>
        <ReviewForm order={dto} onClose={onClose} />
      </View>
    </Modal>
  );
}
