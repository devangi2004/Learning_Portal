import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("smartprep_token"));

  const login = (value) => {
    localStorage.setItem("smartprep_token", value);
    setToken(value);
  };

  const logout = () => {
    localStorage.removeItem("smartprep_token");
    setToken(null);
  };

  const value = useMemo(() => ({ token, login, logout }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
