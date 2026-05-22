import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import books from "../data/books";

function BrowseBooks() {
  const [sortKey, setSortKey] = useState("title");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  const filteredBooks = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return books
      .filter((book) => {
        const matchesQuery =
          !normalizedQuery ||
          book.title.toLowerCase().includes(normalizedQuery) ||
          book.author.toLowerCase().includes(normalizedQuery);

        const matchesPrice =
          priceFilter === "all" ||
          (priceFilter === "under500" && book.price < 500) ||
          (priceFilter === "500to1000" &&
            book.price >= 500 &&
            book.price <= 1000) ||
          (priceFilter === "above1000" && book.price > 1000);

        return matchesQuery && matchesPrice;
      })
      .sort((a, b) => {
        if (sortKey === "title" || sortKey === "author") {
          return a[sortKey].localeCompare(b[sortKey]);
        }

        if (sortKey === "rating" || sortKey === "price") {
          return b[sortKey] - a[sortKey];
        }

        return 0;
      });
  }, [priceFilter, searchQuery, sortKey]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i += 1) {
      stars.push(
        <span key={`full-${i}`} style={{ color: "#f5c518" }}>
          ★
        </span>
      );
    }

    if (halfStar) {
      stars.push(
        <span key="half" style={{ color: "#f5c518" }}>
          ☆
        </span>
      );
    }

    while (stars.length < 5) {
      stars.push(
        <span key={`empty-${stars.length}`} style={{ color: "#ddd" }}>
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div
      className="py-4"
      style={{
        background:
          "radial-gradient(circle at top, #fdf5e8 0%, #f8f4ec 42%, #f4ede0 100%)",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <div
          className="p-4 p-lg-5 mb-4"
          style={{
            background: "linear-gradient(135deg, #5a3825, #9c6b3f)",
            color: "#fff8ef",
            borderRadius: "24px",
            boxShadow: "0 20px 40px rgba(90,56,37,0.18)",
          }}
        >
          <p className="text-uppercase mb-2" style={{ letterSpacing: "0.18em" }}>
            Discover Your Next Read
          </p>
          <h2 className="fw-bold mb-2">Browse Our Collection</h2>
          <p className="mb-0" style={{ maxWidth: "700px", color: "#f6e4d0" }}>
            Search by title or author, narrow by price, and move from browsing to
            checkout without losing the selected book.
          </p>
        </div>

        <div className="row g-3 align-items-end mb-4">
          <div className="col-lg-5">
            <label className="form-label fw-semibold" style={{ color: "#5a3825" }}>
              Search
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Search by title or author"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ borderRadius: "12px", minHeight: "48px" }}
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <label className="form-label fw-semibold" style={{ color: "#5a3825" }}>
              Price Range
            </label>
            <select
              className="form-select"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              style={{ borderRadius: "12px", minHeight: "48px" }}
            >
              <option value="all">All Prices</option>
              <option value="under500">Under Rs.500</option>
              <option value="500to1000">Rs.500 to Rs.1000</option>
              <option value="above1000">Above Rs.1000</option>
            </select>
          </div>
          <div className="col-md-6 col-lg-3">
            <label className="form-label fw-semibold" style={{ color: "#5a3825" }}>
              Sort By
            </label>
            <select
              className="form-select"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              style={{ borderRadius: "12px", minHeight: "48px" }}
            >
              <option value="title">Title (A-Z)</option>
              <option value="author">Author (A-Z)</option>
              <option value="rating">Rating (High to Low)</option>
              <option value="price">Price (High to Low)</option>
            </select>
          </div>
          <div className="col-lg-1 text-lg-end">
            <span className="badge text-bg-dark px-3 py-2">
              {filteredBooks.length}
            </span>
          </div>
        </div>

        <div className="row g-4">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={book.id}>
                <div
                  className="card h-100 border-0"
                  style={{
                    borderRadius: "18px",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    backgroundColor: "#fffdf9",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 16px 28px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 20px rgba(0,0,0,0.06)";
                  }}
                >
                  <img
                    src={book.img}
                    className="card-img-top"
                    alt={book.title}
                    style={{
                      height: "250px",
                      objectFit: "cover",
                      borderTopLeftRadius: "18px",
                      borderTopRightRadius: "18px",
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold" style={{ color: "#5a3825" }}>
                      <Link
                        to={`/books/${book.id}`}
                        style={{ textDecoration: "none", color: "#5a3825" }}
                      >
                        {book.title}
                      </Link>
                    </h5>
                    <p className="card-text text-muted mb-1">by {book.author}</p>
                    <div className="mb-2">{renderStars(book.rating)}</div>
                    <p className="fw-bold mb-3" style={{ color: "#8b0000" }}>
                      Rs.{book.price}
                    </p>
                    <div className="mt-auto d-grid gap-2">
                      <Link
                        to={`/books/${book.id}`}
                        className="btn btn-outline-dark"
                        style={{ borderRadius: "10px" }}
                      >
                        View Details
                      </Link>
                      <Link
                        to={`/buy/${book.id}`}
                        state={{ book }}
                        className="btn btn-dark"
                        style={{ borderRadius: "10px" }}
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div
                className="text-center p-5"
                style={{
                  backgroundColor: "#fffaf3",
                  borderRadius: "20px",
                  border: "1px solid #eadcc6",
                }}
              >
                <h4 style={{ color: "#5a3825" }}>No books match your filters</h4>
                <p className="mb-0 text-muted">
                  Try a different search or widen the price range.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BrowseBooks;
