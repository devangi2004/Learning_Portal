import { createContext, useContext, useMemo, useState } from "react";
import client, { setAuthToken } from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    const { data } = await client.post("/auth/login", { email, password });
    setToken(data.token);
    setAuthToken(data.token);
  };

  const value = useMemo(() => ({ token, login }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
