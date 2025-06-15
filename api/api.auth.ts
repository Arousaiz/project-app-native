import axios from "axios";
import { instance } from "./api.config";

export type AuthInterface = {
  username: string;
  password: string;
};

export type UserPayload = {
  userId: string;
  username: string;
  role: string;
};

export const AuthService = {
  login(data: AuthInterface) {
    console.log(data);
    return instance.post("/login", data).then((response) => {
      return response;
    });
  },

  register(data: AuthInterface): Promise<string> {
    return instance.post("/register", data).then((response) => {
      return response?.data?.message;
    });
  },

  checkAuth(): Promise<UserPayload> {
    return axios
      .post(
        "http://10.130.3.76:3000/me",
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  },

  logout() {
    return instance.post("logout");
  },
};
