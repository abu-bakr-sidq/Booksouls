import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import books from "../data/books";
import "./BookDetails.css";
import "./StorePages.css";

function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const stars = [];

  for (let i = 0; i < fullStars; i += 1) {
    stars.push(
      <span key={`full-${i}`} style={{ color: "#f5c518", fontSize: "1.2rem" }}>
        {"\u2605"}
      </span>
    );
  }

  if (halfStar) {
    stars.push(
      <span key="half" style={{ color: "#f5c518", fontSize: "1.2rem" }}>
        {"\u2606"}
      </span>
    );
  }

  while (stars.length < 5) {
    stars.push(
      <span
        key={`empty-${stars.length}`}
        style={{ color: "#ddd", fontSize: "1.2rem" }}
      >
        {"\u2605"}
      </span>
    );
  }

  return stars;
}

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const book = books.find((item) => item.id === Number.parseInt(id, 10));

  if (!book) {
    return (
      <div className="container py-5 text-center">
        <h2>Book not found</h2>
        <Link to="/books" className="btn btn-primary mt-3">
          Back to Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="book-details-shell">
      <div className="container py-4 book-details-container">
        <button
          className="btn btn-secondary mb-4 book-details-back"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <div className="row g-4 align-items-start">
          <div className="col-lg-5">
            <div className="book-details-panel">
              <div className="book-details-media">
                <img
                  src={book.img}
                  alt={book.title}
                  className="img-fluid rounded shadow-sm book-details-cover"
                />
              </div>
              <h3 className="book-details-price mt-3">Price: Rs.{book.price}</h3>
              <p className="book-details-description">{book.description}</p>

              <button
                onClick={() => navigate(`/buy/${book.id}`, { state: { book } })}
                className="btn btn-success btn-lg mt-3 w-100 book-details-buy"
              >
                Buy Now
              </button>

              <div className="mt-3 book-details-rating">
                <strong>Rating: </strong>
                {renderStars(book.rating)} ({book.rating})
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="book-details-panel">
              <h2 className="book-details-title">{book.title}</h2>
              <h5 className="text-muted mb-3">by {book.author}</h5>

              <h4 className="book-details-section-title">Reviews</h4>
              <ul className="list-unstyled book-detail-reviews">
                {book.reviews.map((review) => (
                  <li key={review.id} className="book-detail-review">
                    <img
                      src={review.profileUrl}
                      alt={review.user}
                      className="book-detail-avatar"
                    />
                    <div>
                      <Link
                        to={review.userLink}
                        className="book-details-review-link"
                      >
                        {review.user}
                      </Link>
                      <p className="mb-0">{review.comment}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <h4 className="book-details-section-title">Related Video</h4>
              <div className="ratio ratio-16x9 book-details-video">
                <iframe
                  src={book.videoUrl}
                  title={`${book.title} Video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
