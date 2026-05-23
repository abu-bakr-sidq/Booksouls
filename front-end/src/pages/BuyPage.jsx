import React, { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import books from "../data/books";
import "./StorePages.css";

function BuyPage() {
  const { bookId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const book = useMemo(() => {
    if (location.state?.book) {
      return location.state.book;
    }

    return books.find((item) => String(item.id) === String(bookId)) || null;
  }, [bookId, location.state]);

  const handlePayment = () => {
    navigate("/checkout", { state: { book } });
  };

  if (!book) {
    return <p className="text-danger text-center mt-4 fs-5">Book not found.</p>;
  }

  return (
    <div className="store-page-shell">
      <div className="store-page-container" style={{ maxWidth: "860px" }}>
        <div className="store-page-card p-4 p-md-5">
        {book.img && (
          <div className="text-center">
            <div className="store-image-frame d-inline-block">
              <img
                src={book.img}
                alt={book.title}
                className="img-fluid"
                style={{
                  width: "220px",
                  height: "300px",
                  objectFit: "cover",
                  border: "4px solid #f0f0f0",
                }}
              />
            </div>
          </div>
        )}

        <div className="mt-4 text-center">
          <h2 className="fw-bold store-section-title">{book.title}</h2>
          <p className="mb-1">
            <strong>Author:</strong> {book.author}
          </p>
          <p className="mb-4">
            <strong>Price:</strong> Rs.{book.price}
          </p>
          {book.description && <p className="mb-4">{book.description}</p>}
        </div>

        <div className="transaction-actions justify-content-center mt-3">
          <button
            className="btn store-primary-btn px-4 py-3"
            onClick={handlePayment}
          >
            Proceed to Payment
          </button>
          <button
            className="btn store-secondary-btn px-4 py-3"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default BuyPage;
