import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/books" replace />;
  }

  return (
    <div
      style={{
        backgroundColor: "#fef9f4",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "'Merriweather', serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff8e7",
          borderRadius: "12px",
          padding: "30px",
          maxWidth: "500px",
          textAlign: "center",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#8B4513", marginBottom: "10px" }}>
          Your Order is Confirmed!
        </h2>
        <p style={{ fontSize: "16px", color: "#5a4636" }}>
          Thank you for your purchase. Your next great read is on its way.
        </p>
        <div
          style={{
            backgroundColor: "#f7ecd9",
            borderRadius: "10px",
            padding: "16px",
            marginTop: "18px",
            textAlign: "left",
          }}
        >
          <p style={{ marginBottom: "8px" }}>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p style={{ marginBottom: "8px" }}>
            <strong>Book:</strong> {order.bookTitle}
          </p>
          <p style={{ marginBottom: "8px" }}>
            <strong>Author:</strong> {order.author}
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong>Paid:</strong> Rs.{order.price}
          </p>
        </div>
        <button
          onClick={() => navigate("/home")}
          style={{
            backgroundColor: "#8B4513",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            marginTop: "20px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
