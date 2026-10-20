"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  refreshUser: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage
  const loadUser = useCallback(async () => {
    try {
      if (typeof window !== "undefined") {
        const storedToken = localStorage.getItem("jbc_token");
        const storedUser = localStorage.getItem("jbc_user");

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));

          // Fetch fresh user data from server (to get updated quiz approval status)
          try {
            const res = await api.getMe();
            if (res.success && res.user) {
              setUser(res.user);
              localStorage.setItem("jbc_user", JSON.stringify(res.user));
            }
          } catch (e) {
            // Token might be expired
            if (e.status === 401) {
              logout();
            }
          }
        }
      }
    } catch (err) {
      console.error("Auth init error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (identifier, password) => {
    const res = await api.login(identifier, password);
    if (res.success) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem("jbc_token", res.token);
      localStorage.setItem("jbc_user", JSON.stringify(res.user));
      return res;
    }
    throw new Error(res.message || "Login failed");
  };

  const register = async (formData) => {
    const res = await api.register(formData);
    if (res.success) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem("jbc_token", res.token);
      localStorage.setItem("jbc_user", JSON.stringify(res.user));
      return res;
    }
    throw new Error(res.message || "Registration failed");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("jbc_token");
      localStorage.removeItem("jbc_user");
    }
  };

  const refreshUser = async () => {
    try {
      const res = await api.getMe();
      if (res.success && res.user) {
        setUser(res.user);
        localStorage.setItem("jbc_user", JSON.stringify(res.user));
      }
    } catch (err) {
      console.error("Refresh user error:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        refreshUser,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isQuizApproved: user?.role === "admin" || !!user?.quizAccessApproved,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
