import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(50, "Имя слишком длинное"),
  email: z.string().email("Некорректный email"),
  phone: z
    .string()
    .regex(
      /^\+?\d{1,4}[-.\s]?(\(?\d{2,3}\)?)[-.\s]?\d{2,4}[-.\s]?\d{2,4}$/,
      "Неверный номер телефона"
    )
    .optional()
    .or(z.literal("")),
  text: z
    .string()
    .min(10, "Сообщение должно содержать не менее 10 символов")
    .max(1000, "Сообщение слишком длинное"),
});
