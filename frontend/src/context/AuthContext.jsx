import { createContext, useState } from "react";
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

  const login = async (email, password) => {
    try {
      const response = await api.post("/accounts/login/", { email, password });
      const data = response.data;
      localStorage.setItem("tokens", JSON.stringify(data));
      setTokens(data);
      setUser(data.user); // optional: store user details
      navigate("/profile"); // redirect after login
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Login failed! Check your credentials.");
    }
  };

  const register = async (full_name, email, phone, password) => {
    try {
      await api.post("/accounts/register/", {
        full_name,
        email,
        phone,
        password,
      });
      alert("Registration successful! Please login.");
      navigate("/login"); // redirect after registration
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Registration failed!");
    }
  };

  return (
    <AuthContext.Provider value={{ user, tokens, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
