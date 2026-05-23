import React, { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";

import upcomingBooks from "../data/upcomingBooks";
import { savePreOrder } from "../utils/preorders";
import "./StorePages.css";

function PreOrder() {
  const { bookId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

  const book = useMemo(() => {
    if (location.state?.book) {
      return location.state.book;
    }

    return upcomingBooks.find((item) => String(item.id) === String(bookId)) || null;
  }, [bookId, location.state]);

  useEffect(() => {
    if (book) {
      savePreOrder(book.id);
    }
  }, [book]);

  if (!book) {
    return <Navigate to="/home" replace />;
  }

  const handlePreOrder = () => {
    setConfirmed(true);

    setTimeout(() => {
      navigate("/home", { replace: true });
    }, 1800);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i += 1) {
      stars.push("★");
    }

    if (halfStar) {
      stars.push("☆");
    }

    return stars.join(" ");
  };

  return (
    <div className="store-page-shell store-page-shell-centered">
      <div className="store-page-card" style={{ maxWidth: "900px", width: "100%", overflow: "hidden" }}>
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src={book.img}
              alt={book.title}
              className="preorder-cover"
              style={{
                width: "100%",
                height: "100%",
                minHeight: "420px",
                objectFit: "cover",
                borderRight: "3px solid #d4a373",
              }}
            />
          </div>
          <div className="col-md-7">
            <div className="preorder-copy" style={{ padding: "28px" }}>
              <p
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "#a16f44",
                  marginBottom: "8px",
                  fontSize: "0.82rem",
                  fontWeight: "700",
                }}
              >
                Upcoming Release
              </p>
              <h2 style={{ margin: "10px 0", fontSize: "2rem", color: "#5a3e2b" }}>
                {book.title}
              </h2>
              <p style={{ margin: "5px 0", fontSize: "1.05rem", color: "#7b5e46" }}>
                by <strong>{book.author}</strong>
              </p>
              <p
                style={{
                  margin: "10px 0",
                  fontSize: "1rem",
                  color: "#ff9800",
                  letterSpacing: "2px",
                }}
              >
                {renderStars(book.rating)} ({book.rating.toFixed(1)})
              </p>
              <p
                style={{
                  margin: "12px 0",
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  color: "#4b2e20",
                }}
              >
                Rs.{book.price}
              </p>
              <p
                style={{
                  margin: "0 0 16px 0",
                  fontSize: "0.95rem",
                  color: "#6f5441",
                }}
              >
                Expected release: <strong>{book.releaseDate}</strong>
              </p>
              <p
                style={{
                  margin: "0 0 22px 0",
                  fontSize: "0.98rem",
                  lineHeight: "1.7",
                  color: "#5c4638",
                }}
              >
                {book.description}
              </p>

              <div
                style={{
                  backgroundColor: "#f7efe2",
                  border: "1px solid #ead7bd",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  marginBottom: "20px",
                  color: "#6c4a30",
                }}
              >
                Your preorder reserves this title and we will highlight it as
                saved in the upcoming books section.
              </div>

              {!confirmed ? (
                <div className="transaction-actions">
                  <button
                    onClick={handlePreOrder}
                    className="store-primary-btn"
                    style={{
                      padding: "12px 24px",
                      fontSize: "1rem",
                      cursor: "pointer",
                      minWidth: "190px",
                    }}
                  >
                    Confirm Pre-order
                  </button>
                  <button
                    onClick={() => navigate("/home")}
                    className="store-secondary-btn"
                    style={{
                      padding: "12px 24px",
                      fontSize: "1rem",
                      backgroundColor: "#fffaf5",
                      cursor: "pointer",
                      minWidth: "160px",
                    }}
                  >
                    Back to Home
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    marginTop: "20px",
                    padding: "15px",
                    backgroundColor: "#e8f5e9",
                    borderRadius: "8px",
                    color: "#2e7d32",
                    fontWeight: "600",
                    fontSize: "1rem",
                  }}
                >
                  Pre-order confirmed. Returning to home...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreOrder;
