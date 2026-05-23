import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "./StorePages.css";

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/books" replace />;
  }

  return (
    <div className="store-page-shell store-page-shell-centered">
      <div className="store-page-card success-card text-center">
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
          className="btn store-primary-btn mt-4 px-4 py-2"
          style={{
            fontSize: "16px",
          }}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
