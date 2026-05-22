import React, { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import books from "../data/books";

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
    <div className="container py-5" style={{ maxWidth: "800px" }}>
      <div className="card shadow-lg border-0 rounded-4 p-4">
        {book.img && (
          <div className="text-center">
            <img
              src={book.img}
              alt={book.title}
              className="rounded-4 shadow"
              style={{
                width: "220px",
                height: "300px",
                objectFit: "cover",
                border: "4px solid #f0f0f0",
              }}
            />
          </div>
        )}

        <div className="mt-4 text-center">
          <h2 className="fw-bold text-primary">{book.title}</h2>
          <p className="mb-1">
            <strong>Author:</strong> {book.author}
          </p>
          <p className="mb-4">
            <strong>Price:</strong> Rs.{book.price}
          </p>
          {book.description && <p className="mb-4">{book.description}</p>}
        </div>

        <div className="d-flex justify-content-center gap-3 mt-3">
          <button
            className="btn btn-success px-4 py-2 rounded-pill fw-bold"
            onClick={handlePayment}
          >
            Proceed to Payment
          </button>
          <button
            className="btn btn-outline-secondary px-4 py-2 rounded-pill"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyPage;
