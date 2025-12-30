import { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [tokens, setTokens] = useState(() => {
    const saved = localStorage.getItem("tokens");
    return saved ? JSON.parse(saved) : null;
  });

  // Fetch profile if token exists
  useEffect(() => {
    if (tokens?.access) {
      fetchProfile();
    }
  }, [tokens]);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/accounts/profile/");
      setUser(res.data);
    } catch (err) {
      console.error("Profile fetch failed");
      logout();
    }
  };

  const login = async (email, password) => {
    const res = await api.post("/accounts/login/", { email, password });
    localStorage.setItem("tokens", JSON.stringify(res.data));
    setTokens(res.data);
  };

  const register = async (full_name, email, phone, password) => {
    await api.post("/accounts/register/", {
      full_name,
      email,
      phone,
      password,
    });
  };

  const logout = () => {
    localStorage.removeItem("tokens");
    setTokens(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, tokens, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
