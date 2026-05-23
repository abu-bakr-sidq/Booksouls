import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import books from "../data/books";
import upcomingBooks from "../data/upcomingBooks";
import "../pages/Home.css";
import {
  clearPreOrders,
  getStoredPreOrderIds,
  savePreOrder,
} from "../utils/preorders";

const featuredCategories = [
  {
    id: 101,
    name: "Sports",
    img: "https://www.shutterstock.com/image-vector/illustrations-badminton-basketball-athletes-posing-260nw-2520932401.jpg",
  },
  {
    id: 102,
    name: "Horror",
    img: "https://m.media-amazon.com/images/I/81zgodoi5RL._UF894,1000_QL80_.jpg",
  },
  {
    id: 103,
    name: "Comics",
    img: "https://m.media-amazon.com/images/I/81KQe6e1hdL.jpg",
  },
  {
    id: 104,
    name: "Physcology",
    img: "https://dynamic.brandcrowd.com/template/preview/design/a8b2e8d4-52b6-472d-8f0d-f64e401082a9/be6247c9-948b-41e2-8a8f-67eec9303d1e?v=4&designTemplateVersion=1&logoTemplateVersion=3&size=design-preview-tall-2x6",
  },
  {
    id: 105,
    name: "Fantasy",
    img: "https://cdn.shopify.com/s/files/1/1057/4964/files/The-Lord-of-the-Rings-The-Fellowship-of-the-Ring-Vintage-Movie-Poster-Original_368x.jpg?v=1738907919",
  },
];

const orderPreview = [
  { id: 101, date: "2025-08-07", total: "Rs.899", status: "Delivered" },
  { id: 102, date: "2025-08-03", total: "Rs.450", status: "Shipped" },
  { id: 103, date: "2025-07-28", total: "Rs.799", status: "Delivered" },
  { id: 104, date: "2025-07-22", total: "Rs.599", status: "Processing" },
  { id: 105, date: "2025-07-18", total: "Rs.350", status: "Cancelled" },
];

function renderStars(rating) {
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
}

function statusBadge(status) {
  if (status === "Delivered") {
    return "bg-success";
  }
  if (status === "Shipped") {
    return "bg-info";
  }
  if (status === "Processing") {
    return "bg-warning text-dark";
  }
  return "bg-danger";
}

function Home() {
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState("title");
  const [preOrderedBooks, setPreOrderedBooks] = useState(getStoredPreOrderIds());

  const sortedBooks = useMemo(() => {
    return [...books].sort((a, b) => {
      if (sortKey === "title" || sortKey === "author") {
        return a[sortKey].localeCompare(b[sortKey]);
      }

      if (sortKey === "rating" || sortKey === "price") {
        return b[sortKey] - a[sortKey];
      }

      return 0;
    });
  }, [sortKey]);

  const testimonials = useMemo(() => {
    return books
      .flatMap((book) =>
        (book.reviews || []).map((review) => ({
          id: `${book.id}-${review.id}`,
          title: book.title,
          ...review,
        }))
      )
      .slice(0, 8);
  }, []);

  return (
    <div className="bookstore-home">
      <div className="text-center mb-5 p-5 rounded shadow hero-section">
        <h1 className="display-4 fw-bold hero-title">Book Souls</h1>
        <p className="lead hero-subtitle">
          "A book is more than pages and ink - it is a doorway to a thousand
          souls and a hundred worlds."
        </p>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3 p-3 rounded shadow-sm toolbar-card">
        <div>
          <label htmlFor="sort" className="me-2 fw-semibold toolbar-label">
            Sort Books By:
          </label>
          <select
            id="sort"
            className="form-select d-inline-block w-auto"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="title">Title (A-Z)</option>
            <option value="author">Author (A-Z)</option>
            <option value="rating">Rating (High to Low)</option>
            <option value="price">Price (High to Low)</option>
          </select>
        </div>
        <Link to="/books" className="btn browse-btn">
          Browse Books
        </Link>
      </div>

      <h3 className="section-title text-center">Books</h3>
      <div className="books-scroll-container mb-5">
        {sortedBooks.slice(0, 8).map((book) => (
          <div className="book-card" key={book.id}>
            <img src={book.img} alt={book.title} className="card-img-top" />
            <div className="book-card-body">
              <h5 className="card-title mb-1 book-card-title">
                <Link to={`/books/${book.id}`} className="book-link">
                  {book.title}
                </Link>
              </h5>
              <p className="text-muted mb-2 book-author book-card-author">
                by {book.author}
              </p>
              <div className="mb-2 book-card-rating">
                {renderStars(book.rating)} <small>({book.rating.toFixed(1)})</small>
              </div>
              <div className="fw-bold mb-3 book-price book-card-price">Rs.{book.price}</div>
              <div className="book-card-actions">
                <Link
                  to={`/books/${book.id}`}
                  className="btn btn-sm card-secondary-btn card-action-btn"
                >
                  Details
                </Link>
                <Link
                  to={`/buy/${book.id}`}
                  state={{ book }}
                  className="btn btn-sm card-primary-btn card-action-btn"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="section-title">Featured Categories</h3>
      <div className="books-scroll-container mb-5">
        {featuredCategories.map((category) => (
          <div className="book-card category-card" key={category.id}>
            <img src={category.img} alt={category.name} className="card-img-top" />
            <div className="card-body text-center category-card-body">
              <h5 className="card-title category-card-title">{category.name}</h5>
              <Link
                to={`/categories/${category.name}`}
                className="btn btn-sm card-primary-btn category-card-btn"
              >
                Explore
              </Link>
            </div>
          </div>
        ))}
      </div>

      <h3 className="section-title">Upcoming Books</h3>
      <button
        onClick={() => setPreOrderedBooks(clearPreOrders())}
        className="btn btn-sm mb-3 clear-preorders-btn"
      >
        Clear Pre-orders
      </button>

      <div className="books-scroll-container mb-5">
        {upcomingBooks.map((book) => {
          const isPreOrdered = preOrderedBooks.includes(book.id);

          return (
            <div className="book-card" key={book.id}>
              <img src={book.img} alt={book.title} className="card-img-top" />
              <div className="book-card-body upcoming-card-body">
                <h5 className="card-title mb-1 book-card-title">{book.title}</h5>
                <p className="text-muted mb-2 book-author book-card-author">
                  by {book.author}
                </p>
                <div className="mb-2 book-card-rating">{renderStars(book.rating)}</div>
                <div className="fw-bold mb-2 book-price book-card-price">Rs.{book.price}</div>
                <p className="small text-muted mb-3 upcoming-release-text">
                  Releases on {book.releaseDate}
                </p>
                {isPreOrdered ? (
                  <span className="preordered-pill">Pre-ordered</span>
                ) : (
                  <button
                    className="btn btn-sm card-primary-btn card-action-btn"
                    onClick={() => {
                      const updated = savePreOrder(book.id);
                      setPreOrderedBooks(updated);
                      navigate(`/pre-order/${book.id}`, { state: { book } });
                    }}
                  >
                    Pre-order
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="section-title">Our Bookstore Stats</h3>
      <div className="row mb-5 text-center">
        {[
          { id: 1, label: "Happy Readers", value: 5000, icon: "bi-emoji-smile-fill" },
          { id: 2, label: "Books Sold", value: 2000, icon: "bi-book-half" },
          { id: 3, label: "Authors", value: 150, icon: "bi-person-lines-fill" },
        ].map((stat) => (
          <div key={stat.id} className="col-md-4 mb-3">
            <div className="p-4 rounded shadow-sm stat-card">
              <i className={`bi ${stat.icon} stat-icon`}></i>
              <h4 className="mt-2">{stat.value.toLocaleString()}</h4>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="section-title">Our Orders</h3>
      <div className="table-responsive mb-5">
        <table className="table align-middle shadow-sm orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderPreview.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.date}</td>
                <td>{order.total}</td>
                <td>
                  <span className={`badge ${statusBadge(order.status)}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="section-title">Reader Voices</h3>
      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="rounded-[24px] border border-[#e7d5c1] bg-gradient-to-br from-[#fffaf3] to-[#f7efe4] p-4 shadow-[0_12px_26px_rgba(75,46,46,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(75,46,46,0.12)]"
          >
            <div className="flex h-full min-h-[210px] flex-col items-center rounded-[20px] border border-white/60 bg-[#fffaf4]/85 px-4 py-4 text-center">
              <img
                src={testimonial.profileUrl}
                alt={testimonial.user}
                className="mb-3 h-[72px] w-[72px] shrink-0 rounded-full border-[3px] border-[#d4a373] object-cover shadow-sm"
              />
              <div className="flex flex-1 flex-col items-center gap-2">
                <h5 className="mb-0 text-[0.98rem] font-bold leading-tight text-[#8b4513]">
                  <a
                    href={testimonial.userLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="!text-[#8b4513] no-underline transition-colors duration-200 hover:!text-[#a45d25] visited:!text-[#8b4513]"
                  >
                    {testimonial.user}
                  </a>
                </h5>
                <p className="mb-0 min-h-[52px] text-[0.93rem] font-medium leading-6 text-[#9a7759]">
                  {testimonial.title}
                </p>
                <p className="mb-0 text-[0.96rem] italic leading-7 text-[#5e4634]">
                  "{testimonial.comment}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mb-5">
        <div className="col-md-8">
          <h3 className="section-title">About Book Souls</h3>
          <div className="p-4 rounded shadow-sm bg-light bookstore-bio">
            <p>
              <strong>OUR VISION -</strong> At <em>Book Souls</em>, stories
              breathe and hearts listen. Every book carries a soul, a unique
              voice that whispers wisdom, dreams, and emotions to those willing
              to turn its pages.
            </p>
            <p>
              From the soft rustle of paper to the spark of an unforgettable
              line, we celebrate the magic that turns reading into a soulful
              journey.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <h3 className="section-title">Contact Info</h3>
          <div className="p-4 rounded shadow-sm bg-light contact-info">
            <p>
              <strong>Phone:</strong> +91 63818 71801
              <br />
              <strong>Email:</strong>{" "}
              <a href="mailto:jabubackersiddiq@gmail.com">
                jabubackersiddiq@gmail.com
              </a>
              <br />
              <strong>Address:</strong> 31/16 Mariya Doss Street, Royapuram,
              Chennai - 600013
            </p>
          </div>
        </div>
      </div>

      <footer className="text-center py-3 border-top footer-text">
        &copy; {new Date().getFullYear()} Book Souls - All rights reserved
      </footer>
    </div>
  );
}

export default Home;
