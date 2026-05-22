import React, { useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const book = useMemo(() => location.state?.book || null, [location.state]);

  if (!book) {
    return <Navigate to="/books" replace />;
  }

  const handlePayment = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      navigate("/order-success", {
        state: {
          order: {
            id: `ORD-${Date.now()}`,
            bookTitle: book.title,
            author: book.author,
            price: book.price,
          },
        },
      });
    }, 1000);
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        padding: "40px 0",
      }}
    >
      <div className="container">
        <div className="row g-4 justify-content-center">
          <div className="col-lg-5">
            <div className="card shadow-lg p-4 h-100" style={{ borderRadius: "10px" }}>
              <h4 className="mb-3" style={{ color: "#5a3e2b" }}>
                Order Summary
              </h4>
              <img
                src={book.img}
                alt={book.title}
                style={{
                  width: "100%",
                  height: "280px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  marginBottom: "16px",
                }}
              />
              <h5>{book.title}</h5>
              <p className="text-muted mb-2">by {book.author}</p>
              <div className="d-flex justify-content-between">
                <span>Book Price</span>
                <strong>Rs.{book.price}</strong>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>Delivery</span>
                <strong>Free</strong>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <span>Total</span>
                <strong>Rs.{book.price}</strong>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="card shadow-lg p-4 mx-auto" style={{ borderRadius: "10px" }}>
              <h2 className="text-center mb-4" style={{ color: "#5a3e2b" }}>
                Checkout
              </h2>
              <form onSubmit={handlePayment}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Card Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Expiry Date</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">CVV</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="***"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn w-100"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: "#5a3e2b",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {isSubmitting ? "Processing..." : "Pay Now"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
