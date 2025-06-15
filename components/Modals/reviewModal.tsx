import { Orders } from "@/types/order";
import { ScrollView, Text, View } from "react-native";
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
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-semibold">Оставьте отзыв</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        style={{ maxHeight: "90%" }} // чтобы ограничить высоту ScrollView
      >
        <ReviewForm order={dto} onClose={onClose} />
      </ScrollView>
    </Modal>
  );
}
