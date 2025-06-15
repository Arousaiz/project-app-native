import { showToast } from "@/utils/toast";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const instance = axios.create({
  baseURL: "http://10.130.3.76:3000",
  headers: { "Content-Type": "application/json;charset=utf-8" },
  withCredentials: true,
  timeout: 5000,
});

instance.interceptors.response.use(
  async (response) => {
    // await new Promise(resolve => setTimeout(resolve, Math.random() * 3000));
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      console.log(error);

      switch (status) {
        case 400:
          showToast("Неверный запрос (400). Проверьте введённые данные.");
          break;
        case 401:
        case 403:
          showToast("Доступ запрещён. Пожалуйста, войдите в систему.");
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          break;
        case 404:
          showToast("Ресурс не найден (404).");
          break;
        case 500:
          showToast("Внутренняя ошибка сервера (500). Попробуйте позже.");
          break;
        default:
          showToast("Произошла неизвестная ошибка.");
      }
    } else {
      showToast("Ошибка сети или сервер не отвечает.");
    }

    return Promise.reject(error);
  }
);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});
