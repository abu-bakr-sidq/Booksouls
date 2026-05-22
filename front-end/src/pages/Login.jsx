import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { setStoredUser } from "../utils/auth";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);

      setMessage(res.data.message);

      if (res.data.message === "Login successful") {
        localStorage.setItem("token", res.data.token);
        setStoredUser(res.data.user);
        navigate(location.state?.from || "/home", { replace: true });
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #fdf6e3, #f8e1c4)",
        padding: "20px",
        fontFamily: "'Merriweather', serif",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "#fffaf5",
          borderRadius: "15px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
          padding: "25px",
          textAlign: "center",
          animation: "fadeIn 0.6s ease-in-out",
        }}
      >
        <h2 style={{ color: "#5a3e2b", marginBottom: "8px" }}>Welcome Back</h2>
        <p
          style={{
            color: "#7b5e46",
            marginBottom: "18px",
            fontSize: "0.95rem",
          }}
        >
          Login to continue your journey
        </p>

        {message && (
          <p
            style={{
              marginBottom: "15px",
              color: message.includes("success") ? "#2e7d32" : "tomato",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #d4a373",
              outline: "none",
              fontSize: "1rem",
              fontFamily: "'Merriweather', serif",
            }}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #d4a373",
              outline: "none",
              fontSize: "1rem",
              fontFamily: "'Merriweather', serif",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px 24px",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#d4a373",
              color: "#fff",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontWeight: "bold",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#b07a50")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#d4a373")
            }
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: "20px", color: "#7b5e46" }}>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#b07a50",
              fontWeight: "bold",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
