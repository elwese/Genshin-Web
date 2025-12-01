import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isLogged: false,
    esAdmin: false,
    userData: null
  });

  const login = (user) => {
    setAuth({
      isLogged: true,
      esAdmin: user.role === "admin",
      userData: user
    });
  };

  const toggleRole = () => {
  setAuth(prev => ({
    ...prev,
    esAdmin: !prev.esAdmin
  }));
};




  const logout = () => {
    setAuth({
      isLogged: false,
      esAdmin: false,
      userData: null
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, toggleRole }}>
      {children}
    </AuthContext.Provider>
  );
}
