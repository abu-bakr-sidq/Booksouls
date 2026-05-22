import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import books from "../data/books";

function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={i} style={{ color: "#f5c518", fontSize: "1.2rem" }}>
        ★
      </span>
    );
  }
  if (halfStar) {
    stars.push(
      <span key="half" style={{ color: "#f5c518", fontSize: "1.2rem" }}>
        ☆
      </span>
    );
  }
  while (stars.length < 5) {
    stars.push(
      <span
        key={"empty" + stars.length}
        style={{ color: "#ddd", fontSize: "1.2rem" }}
      >
        ★
      </span>
    );
  }
  return stars;
}

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const book = books.find((b) => b.id === parseInt(id));

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

  const handleBuy = () => {
    navigate(`/buy/${book.id}`, { state: { book } });
  };

  return (
    <div className="container py-4">
      <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="row">
        <div className="col-md-5">
          <img
            src={book.img}
            alt={book.title}
            className="img-fluid rounded shadow-sm"
            style={{ objectFit: "cover", height: "400px", width: "100%" }}
          />
          <h3 className="mt-3">Price: ₹{book.price}</h3>
          <p>{book.description}</p>

          <button
            onClick={handleBuy}
            className="btn btn-success btn-lg mt-3"
            style={{ width: "100%" }}
          >
            Buy Now
          </button>

          <div className="mt-3">
            <strong>Rating: </strong> {renderStars(book.rating)} ({book.rating})
          </div>
        </div>

        <div className="col-md-7">
          <h2>{book.title}</h2>
          <h5 className="text-muted mb-3">by {book.author}</h5>

          <h4>Reviews</h4>
          <ul
            className="list-unstyled"
            style={{ maxHeight: "250px", overflowY: "auto" }}
          >
            {book.reviews.map((review) => (
              <li key={review.id} className="d-flex align-items-center mb-3">
                <img
                  src={review.profileUrl}
                  alt={review.user}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <Link
                    to={review.userLink}
                    style={{
                      fontWeight: "600",
                      color: "#007bff",
                      textDecoration: "none",
                    }}
                  >
                    {review.user}
                  </Link>
                  <p className="mb-0">{review.comment}</p>
                </div>
              </li>
            ))}
          </ul>

          <h4>Related Video</h4>
          <div className="ratio ratio-16x9">
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
  );
}

export default BookDetails;
