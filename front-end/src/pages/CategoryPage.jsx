// src/pages/CategoryPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";

const allBooks = [
  {
    id: 5,
    title: "Marvel's Spider-Man: Miles",
    author: "Jed MacKay",
    img: "https://m.media-amazon.com/images/I/91xA9AKe5UL._SY466_.jpg",
    rating: 3.3,
    price: 565,
    category: "Comics",
  },
  {
    id: 9,
    title: "Spider-Man: Into the Spider-Verse - The Art of the Movie",
    author: "Ramin Zahed",
    img: "https://m.media-amazon.com/images/I/51FtYYdIwWL._SY445_SX342_.jpg",
    rating: 4.8,
    price: 1450,
    category: "Comics",
  },
  {
    id: 1,
    title: "Cristiano Ronaldo Striker Force 7. Volume 1",
    author: "Cristiano Ronaldo",
    img: "https://m.media-amazon.com/images/I/81RqLAFlM6L._UF1000,1000_QL80_.jpg",
    rating: 4.5,
    price: 899,
    category: "Comics",
  },
  {
    id: 2,
    title: "Messi",
    author: "Guillem Balague",
    img: "https://m.media-amazon.com/images/I/41hHN7zoQjL._SY445_SX342_.jpg",
    rating: 4.7,
    price: 536,
    category: "Sports",
  },
  {
    id: 7,
    title: "Cristiano Ronaldo: The Way i Feel",
    author: "Cristiano Ronaldo",
    img: "https://m.media-amazon.com/images/I/51ZFdMzBK+L.jpg",
    rating: 4.7,
    price: 2199,
    category: "Sports",
  },
  {
    id: 12,
    title: "It",
    author: "Stephen King",
    img: "https://m.media-amazon.com/images/I/91QQu3SGAWL.jpg",
    rating: 4.5,
    price: 499,
    category: "Horror",
  },
  {
    id: 3,
    title: "The Prince Neymar.JR",
    author: "Simon-Mugford",
    img: "https://m.media-amazon.com/images/I/81Yj7b-hRZL._UF1000,1000_QL80_.jpg",
    rating: 4.3,
    price: 309,
    category: "Sports",
  },
  {
    id: 8,
    title: "ROBERT DOWNEY JR",
    author: "Charles D. Williams",
    img: "https://m.media-amazon.com/images/I/612rtXEimmL._SY522_.jpg",
    rating: 4.8,
    category: "comics",
    price: 1299,
  },
  {
    id: 10,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    img: "https://m.media-amazon.com/images/I/81YOuOGFCJL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.9,
    category: "horror",
    price: 599,
  },
  {
    id: 11,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    img: "https://m.media-amazon.com/images/I/91SZSW8qSsL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.9,
    category: "Fantasy",
    price: 799,
  },
  {
    id: 13,
    title: "The Shining",
    author: "Stephen King",
    img: "https://books.google.co.in/books/publisher/content?id=QABREQAAQBAJ&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U24px-Xszuug70CMyvNoZ0cTBKTCA&w=1280",
    rating: 4.7,
    category: "horror",
    price: 520,
  },
  {
    id: 14,
    title: "Dracula",
    author: "Bram Stoker",
    img: "https://m.media-amazon.com/images/I/81kSkHdauSL.jpg",
    rating: 4.3,
    category: "horror",
    price: 450,
  },
  {
    id: 15,
    title: "Frankenstein",
    author: "Mary Shelley",
    img: "https://m.media-amazon.com/images/I/618hQVv2e2L.jpg",
    rating: 4.4,
    category: "horror",
    price: 470,
  },
  {
    id: 16,
    title: "Deep Work",
    author: "Cal Newport",
    img: "https://books.google.co.in/books/publisher/content?id=lZpFCgAAQBAJ&pg=PA1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U2EA4BHcru6ODs7tAdmuUQ4ca-Xpw&w=1280",
    rating: 4.4,
    category: "physcology",
    price: 390,
  },
  {
    id: 20,
    title: "Quiet",
    author: "Susan Cain",
    img: "https://books.google.co.in/books/content?id=O6gZJa9kdlYC&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U076LrQ0eRrpOu3Fo240wN-FotZvw&w=1280",
    rating: 4.5,
    category: "physcology",
    price: 440,
  },
  {
    id: 21,
    title: "Grit",
    author: "Angela Duckworth",
    img: "https://books.google.co.in/books/publisher/content?id=Xh2rEAAAQBAJ&pg=PA1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U3P_ZpG7gGY9SzayTmp42XrMugIRQ&w=1280",
    rating: 4.3,
    category: "physcology",
    price: 380,
  },
  {
    id: 22,
    title: "Outliers",
    author: "Malcolm Gladwell",
    img: "https://books.google.co.in/books/content?id=ialrgIT41OAC&pg=PA1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U3NLBOshwZWpNXsbpMglzJmig1yXQ&w=1280",
    rating: 4.2,
    category: "physcology",
    price: 400,
  },
  {
    id: 23,
    title: "The War of Art",
    author: "Steven Pressfield",
    img: "https://books.google.co.in/books/publisher/content?id=sR3hAAAAQBAJ&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U0W5jn0ZLsJnmt56Hcsg0bPqLyhKw&w=1280",
    rating: 4.1,
    category: "fantasy",
    price: 370,
  },
  {
    id: 24,
    title: "The Art of Happiness",
    author: "Dalai Lama",
    img: "https://m.media-amazon.com/images/I/61kCN2ZV1eL.jpg",
    rating: 4.6,
    category: "fantasy",
    price: 460,
  },
  {
    id: 25,
    title: "Daring Greatly",
    author: "Brené Brown",
    img: "https://m.media-amazon.com/images/I/5176nHPg2IL._SY445_SX342_.jpg",
    rating: 4.4,
    category: "physcology",
    price: 430,
  },
  {
    id: 27,
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    img: "https://images-na.ssl-images-amazon.com/images/I/91b0C2YNSrL.jpg",
    rating: 4.7,
    category: "fantasy",
    price: 550,
  },
  {
    id: 28,
    title: "The Call of the Wild",
    author: "Jack London",
    img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRbcEE2tWs1aQmnqbD0kRgEUgqeLKXzyR5bUyG6aLj7xrIhEZ7_79aRAzE9PTEZlb8FqqjL",
    rating: 4.5,
    category: "physcology",
    price: 399,
  },
  {
    id: 30,
    title: "Mindset",
    author: "Carol S. Dweck",
    img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcREK4jTh0inrERRTQXZTZyOXGBtnuVIv2_fQztFSqb_TE_tn6ZU",
    rating: 4.5,
    category: "physcology",
    price: 430,
  },
  {
    id: 6,
    title: "The Untold Story DHONI",
    author: "Sinha Amit",
    img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTqf-jopYIiEqo_pSR8NQJLwuEZXNaVuUOP4zLaDWG5hJhB01kvG84B673qkkV_0bULRXkLkj3DG-bThPtkRTl8RQTs0Nmv9aRGRZHcszM",
    rating: 4.5,
    category: "sports",
    price: 591,
  },
  {
    id: 4,
    title: "The Psychology of Money",
    author: "Rebecca Elliot ",
    img: "https://m.media-amazon.com/images/I/41ewps63rPL._SY445_SX342_.jpg",
    rating: 5.0,
    category: "physcology",
    price: 1292,
  },
];

const CategoryPage = () => {
  const { categoryName } = useParams();

  // ✅ Safe filter: only compare if category exists
  const filteredBooks = allBooks.filter(
    (book) =>
      book.category &&
      book.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{categoryName} Books</h2>
      <div className="row">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div className="col-md-3 mb-4" key={book.id}>
              <div className="card shadow-sm h-100">
                <img
                  src={book.img}
                  className="card-img-top"
                  alt={book.title}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text text-muted">{book.author}</p>
                  <p className="mb-1">
                    ⭐ {book.rating} | ₹{book.price}
                  </p>
                  <Link
                    to={`/buy/${book.id}`}
                    state={{ book }}
                    className="btn btn-primary btn-sm"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No books found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
