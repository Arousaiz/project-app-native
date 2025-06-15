import { useAuth } from "@/providers/authContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Logout() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function performLogout() {
      await logout();
      router.replace("/restaurant");
    }
    performLogout();
  }, [logout, router]);

  return null;
}
