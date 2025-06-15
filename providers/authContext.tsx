import { AuthInterface, AuthService, UserPayload } from "@/api/api.auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, type ReactNode } from "react";

type AuthContextType = {
  user: UserPayload | null;
  isLoading: boolean;
  error: unknown;
  login: (credentials: AuthInterface) => Promise<void>;
  logout: () => Promise<void>;
  refetchUser: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery<UserPayload | null, unknown>({
    queryKey: ["currentUser"],
    queryFn: () => AuthService.checkAuth(),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: AuthInterface) => AuthService.login(credentials),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(["currentUser"], null);
    },
  });

  const login = async (credentials: AuthInterface) => {
    await loginMutation.mutateAsync(credentials);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const refetchUser = () => {
    refetch();
  };

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        error,
        login,
        logout,
        refetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
