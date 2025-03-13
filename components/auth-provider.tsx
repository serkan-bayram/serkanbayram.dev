import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, ReactNode } from "react";
import { fetchAuth } from "../lib/api/fetch";

export interface AuthContextType {
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const query = useQuery({
    queryKey: ["auth"],
    queryFn: fetchAuth,
  });

  const isAuthenticated = !!query.data;

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
