import { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(() => {
    const saved = localStorage.getItem("tokens");
    return saved ? JSON.parse(saved) : null;
  });

  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await api.get("/accounts/profile/");
      setUser(res.data);
    } catch (err) {
      console.error("Profile fetch failed");
    }
  };

  const login = async (email, password) => {
    const res = await api.post("/accounts/login/", { email, password });
    localStorage.setItem("tokens", JSON.stringify(res.data));
    setTokens(res.data);
    await fetchProfile();
    navigate("/profile");
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
    localStorage.removeItem("tokens");
    navigate("/login");
  };

  useEffect(() => {
    if (tokens) fetchProfile();
  }, [tokens]);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, tokens}}>
      {children}
    </AuthContext.Provider>
  );
};
