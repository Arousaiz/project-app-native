import { z } from "zod";

export const ReviewSchema = z.object({
  text: z.string(),
  rating: z.coerce.number().min(1, "Поставьте хотя бы 1 звезду"),
});

export const DishReviewSchema = ReviewSchema.extend({
  menuItemId: z.string().uuid(),
});

export const RestaurantReviewSchema = ReviewSchema.extend({
  restaurantId: z.string().uuid(),
});

export const CreateOrderReviewSchema = z.object({
  orderId: z.string().uuid(),
  restaurantReview: RestaurantReviewSchema.optional(),
  dishReviews: z.array(DishReviewSchema),
});
