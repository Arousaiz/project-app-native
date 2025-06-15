import { instance } from "./api.config";

export const ReviewService = {
  fetchReviews(limit = 50, offset = 0) {
    return instance
      .get("/user/reviews", { params: { limit, offset } })
      .then((res) => res.data);
  },

  writeReview(review: any) {
    return instance.post("/reviews/create", review).then((res) => res.data);
  },
};
