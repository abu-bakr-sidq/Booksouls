import Aqheel from "../assets/Aqheel.jpg";
import Bazil from "../assets/Bazil.jpg";
import Ibrahim from "../assets/Ibrahim.jpg";
import Ashiq from "../assets/Ashiq.jpg";
import Wahidth from "../assets/Wahidth.jpg";
const books = [
  {
    id: 1,
    title: "Cristiano Ronaldo Striker Force 7. Volume 1",
    author: "Cristiano Ronaldo",
    img: "https://m.media-amazon.com/images/I/81RqLAFlM6L._UF1000,1000_QL80_.jpg",
    rating: 4.5,
    price: 899,
    description:
      "a motley crew of super-powered agents from around the world must protect the Earth from annihilation – provided Cristiano can teach them how to work as a team!",
    reviews: [
      {
        id: 1,
        user: "Aabith",
        profileUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsPkKCvfAySUGOKUyT4ym4Ih56UnmtCdQOuw&s",
        userLink: "https://www.instagram.com/iam.aabii_/",
        comment: "Inspirational and timeless.",
      },
      {
        id: 2,
        user: "Ishrath",
        profileUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4dcm0EIRC1gRT9dBWEn7kuiJE5BDXBYAURA&s",
        userLink: "https://www.instagram.com/its_hijabichic/",
        comment: "A magical journey While Reading This Books.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/QtIahjZN4d4",
  },
  {
    id: 2,
    title: "Messi",
    author: "Guillem Balague",
    img: "https://m.media-amazon.com/images/I/41hHN7zoQjL._SY445_SX342_.jpg",
    rating: 4.7,
    price: 536,
    description:
      "An in-depth biography of Lionel Messi, exploring his journey from Rosario’s streets to becoming one of the greatest footballers in history.",
    reviews: [
      {
        id: 3,
        user: "Aatif Mohammad",
        profileUrl:
          "https://thumbs.dreamstime.com/b/silhouette-muslim-man-praying-night-moon-background-month-ramadan-serene-under-moonlight-holy-symbolizing-364122747.jpg",
        userLink: "https://www.instagram.com/aatif_md_01/",
        comment: "Practical and life-changing advice.",
      },
      {
        id: 4,
        user: "Akhiaqheel",
        profileUrl: Aqheel,
        userLink: "https://www.instagram.com/akhiaqheel/",
        comment: "Helped me to Build In my mind i'm always The Best!",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/xA_kOqYJY3w",
  },
  {
    id: 3,
    title: "The Prince Neymar.JR",
    author: "Simon-Mugford",
    img: "https://m.media-amazon.com/images/I/81Yj7b-hRZL._UF1000,1000_QL80_.jpg",
    rating: 4.3,
    price: 309,
    reviews: [
      {
        id: 3,
        user: "Ibrahim",
        profileUrl: Ibrahim,
        comment: "A chilling dystopian classic.",
      },
      {
        id: 4,
        user: "bazil",
        profileUrl: Bazil,
        userLink: "https://www.instagram.com/bazii_ahamed/",
        comment: "Still so relevant today.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/poYZ8RmZCO0",
  },
  {
    id: 4,
    title: "The Psychology of Money",
    author: "Rebecca Elliot ",
    img: "https://m.media-amazon.com/images/I/41ewps63rPL._SY445_SX342_.jpg",
    rating: 5.0,
    price: 1292,
    reviews: [
      {
        id: 4,
        user: "Ashiq",
        profileUrl: Ashiq, // placeholder, replace if you have his real photo
        userLink: "https://www.instagram.com/ashiill__45/",
        comment: "A powerful and moving story.",
      },
      {
        id: 5,
        user: "Wahidth",
        profileUrl: Wahidth, // placeholder, replace if you have his real photo
        userLink: "https://www.instagram.com/wahxtx__/",
        comment: "An unforgettable classic.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/l__STYeYMd8",
  },
  {
    id: 5,
    title: "Marvel's Spider-Man: Miles",
    author: " Jed MacKay",
    img: "https://m.media-amazon.com/images/I/91xA9AKe5UL._SY466_.jpg",
    rating: 3.3,
    price: 565,
    reviews: [
      {
        id: 6,
        user: "james",
        profileUrl: "https://randomuser.me/api/portraits/men/34.jpg",
        userLink: "https://www.instagram.com/liam_reads/",
        comment: "spidy on the way.",
      },
      {
        id: 7,
        user: "louis",
        profileUrl: "https://randomuser.me/api/portraits/women/29.jpg",
        userLink: "https://www.instagram.com/sophia_storyteller/",
        comment: "sindy is moon on fire!",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/8w_oNlOIshE",
  },
  {
    id: 6,
    title: "The Untold Story DHONI",
    author: "Sinha Amit",
    img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTqf-jopYIiEqo_pSR8NQJLwuEZXNaVuUOP4zLaDWG5hJhB01kvG84B673qkkV_0bULRXkLkj3DG-bThPtkRTl8RQTs0Nmv9aRGRZHcszM",
    rating: 4.5,
    price: 591,
    description:
      "A revealing look into the life and career of M.S. Dhoni, from small-town beginnings to cricketing legend.",

    reviews: [
      {
        id: 9,
        user: "Isabel",
        profileUrl: "https://randomuser.me/api/portraits/women/28.jpg",
        userLink: "/users/isabel",
        comment: "A timeless romance.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/nOj1H_sGHO4",
  },
  {
    id: 7,
    title: "Cristiano Ronaldo: The Way i Feel",
    author: "Cristiano Ronaldo",
    img: "https://m.media-amazon.com/images/I/51ZFdMzBK+L.jpg",
    rating: 4.7,
    price: 2199,
    description:
      "This coffee-table book by Cristiano Ronaldo with Manuela Brandao and foreword by Sir Bobby Charlton is accompanied by a beautiful photographic account of the star taken by Jorge Monteiro",
    reviews: [
      {
        id: 3,
        user: "Aatif Mohammad",
        profileUrl:
          "https://thumbs.dreamstime.com/b/silhouette-muslim-man-praying-night-moon-background-month-ramadan-serene-under-moonlight-holy-symbolizing-364122747.jpg",
        userLink: "https://www.instagram.com/aatif_md_01/",
        comment: "Practical and life-changing advice.",
      },
      {
        id: 4,
        user: "Akhiaqheel",
        profileUrl: Aqheel,
        userLink: "https://www.instagram.com/akhiaqheel/",
        comment: "Helped me to Build In my mind i'm always The Best!",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/kbKldiDOgEE",
  },
  {
    id: 8,
    title: "ROBERT DOWNEY JR",
    author: "Charles D. Williams",
    img: "https://m.media-amazon.com/images/I/612rtXEimmL._SY522_.jpg",
    rating: 4.8,
    price: 1299,
    reviews: [
      {
        id: 8,
        user: "Ethan Morales",
        profileUrl: "https://randomuser.me/api/portraits/men/45.jpg",
        userLink: "https://www.instagram.com/ethan_reads_daily/",
        comment: "Im IRON MAN.",
      },
      {
        id: 9,
        user: "Amelia Johnson",
        profileUrl: "https://randomuser.me/api/portraits/women/33.jpg",
        userLink: "https://www.instagram.com/amelia_booksandcoffee/",
        comment: "Tony the Legend of Marvel",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/ovt9mV69pVg",
  },
  {
    id: 9,
    title: "Spider-Man: Into the Spider-Verse - The Art of the Movie",
    author: "Ramin Zahed",
    img: "https://m.media-amazon.com/images/I/51FtYYdIwWL._SY445_SX342_.jpg",
    rating: 4.8,
    price: 1450,
    description:
      "Behind-the-scenes art, storyboards, and commentary from the creators of Spider-Man: Into the Spider-Verse.",
    reviews: [
      {
        id: 14,
        user: "Quinn",
        profileUrl: "https://randomuser.me/api/portraits/women/65.jpg",
        userLink: "/users/quinn",
        comment:
          "Amazing visuals and an inspiring look at the animation process.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/g4Hbz2jLxvQ", // ✅ Works in browser & clickable
  },

  {
    id: 10,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    img: "https://m.media-amazon.com/images/I/81YOuOGFCJL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.9,
    price: 599,
    description:
      "The first book in the iconic Harry Potter series, following the magical journey of a young wizard as he discovers his destiny.",
    reviews: [
      {
        id: 15,
        user: "Ryan",
        profileUrl: "https://randomuser.me/api/portraits/men/40.jpg",
        userLink: "/users/ryan",
        comment: "A timeless classic that defined my childhood.",
      },
      {
        id: 16,
        user: "Sophia",
        profileUrl: "https://randomuser.me/api/portraits/women/44.jpg",
        userLink: "/users/sophia",
        comment: "Even as an adult, it still feels magical.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/VyHV0BRtdxo", // ✅ Working trailer link
  },

  {
    id: 11,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    img: "https://m.media-amazon.com/images/I/91SZSW8qSsL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.9,
    price: 799,
    description:
      "An epic fantasy adventure in the land of Middle-earth, following the journey to destroy the One Ring.",
    reviews: [
      {
        id: 17,
        user: "Laura",
        profileUrl: "https://randomuser.me/api/portraits/women/55.jpg",
        userLink: "/users/laura",
        comment: "A masterpiece of storytelling and world-building.",
      },
      {
        id: 18,
        user: "Mike",
        profileUrl: "https://randomuser.me/api/portraits/men/34.jpg",
        userLink: "/users/mike",
        comment: "The greatest fantasy epic ever written.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/V75dMMIW2B4", // ✅ Working official trailer
  },

  {
    id: 12,
    title: "It",
    author: "Stephen King",
    img: "https://m.media-amazon.com/images/I/91QQu3SGAWL.jpg",
    rating: 4.5,
    price: 499,
    description:
      "A terrifying story of a shape-shifting entity haunting the town of Derry.",
    reviews: [
      {
        id: 19,
        user: "Nina",
        profileUrl: "https://randomuser.me/api/portraits/women/11.jpg",
        userLink: "/users/nina",
        comment: "Absolutely spine-chilling!",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/xKJmEC5ieOk",
  },
  {
    id: 13,
    title: "The Shining",
    author: "Stephen King",
    img: "https://books.google.co.in/books/publisher/content?id=QABREQAAQBAJ&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U24px-Xszuug70CMyvNoZ0cTBKTCA&w=1280",
    rating: 4.7,
    price: 520,
    description:
      "A family becomes caretakers of a haunted hotel where evil spirits dwell.",
    reviews: [
      {
        id: 20,
        user: "Oliver",
        profileUrl: "https://randomuser.me/api/portraits/men/42.jpg",
        userLink: "/users/oliver",
        comment: "Terrifying and unforgettable!",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/5Cb3ik6zP2I",
  },
  {
    id: 14,
    title: "Dracula",
    author: "Bram Stoker",
    img: "https://m.media-amazon.com/images/I/81kSkHdauSL.jpg",
    rating: 4.3,
    price: 450,
    description:
      "The classic tale of Count Dracula and the terror he spreads in England.",
    reviews: [
      {
        id: 21,
        user: "Sophia",
        profileUrl: "https://randomuser.me/api/portraits/women/44.jpg",
        userLink: "/users/sophia",
        comment: "Creepy and masterfully written.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/XGNeFrnhlvw",
  },

  {
    id: 15,
    title: "Frankenstein",
    author: "Mary Shelley",
    img: "https://m.media-amazon.com/images/I/618hQVv2e2L.jpg",
    rating: 4.4,
    price: 470,
    description:
      "The story of Victor Frankenstein, a scientist who creates a living being, with terrifying consequences.",
    reviews: [
      {
        id: 22,
        user: "Liam",
        profileUrl: "https://randomuser.me/api/portraits/men/59.jpg",
        userLink: "/users/liam",
        comment: "A dark and thought-provoking classic.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/NGARin2VCsg",
  },

  {
    id: 16,
    title: "Deep Work",
    author: "Cal Newport",
    img: "https://books.google.co.in/books/publisher/content?id=lZpFCgAAQBAJ&pg=PA1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U2EA4BHcru6ODs7tAdmuUQ4ca-Xpw&w=1280",
    rating: 4.4,
    price: 390,
    description: "Rules for focused success in a distracted world.",
    reviews: [
      {
        id: 23,
        user: "Maya",
        profileUrl: "https://randomuser.me/api/portraits/women/26.jpg",
        userLink: "/users/maya",
        comment: "Great strategies to improve concentration.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/23CoepWnYaU",
  },
  {
    id: 17,
    title: "The Four Agreements",
    author: "Don Miguel Ruiz",
    img: "https://books.google.co.in/books/publisher/content?id=t54LEAAAQBAJ&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U2Df5WBXgV_Hr7I9Hhxx5TUA1mC_w&w=1280",
    rating: 4.6,
    price: 350,
    description:
      "A practical guide to personal freedom based on ancient Toltec wisdom.",
    reviews: [
      {
        id: 24,
        user: "Liam",
        profileUrl: "https://randomuser.me/api/portraits/men/59.jpg",
        userLink: "/users/liam",
        comment: "Simple but powerful principles.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/IRP18ozpcSc",
  },
  {
    id: 18,
    title: "The Lean Startup",
    author: "Eric Ries",
    img: "https://books.google.co.in/books/content?id=19forYX7NLQC&pg=PA1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U2_Sy918bBL-t5pp238gGNhEOAPhg&w=1280",
    rating: 4.4,
    price: 480,
    description:
      "A methodology for developing businesses and products in a more efficient way.",
    reviews: [
      {
        id: 25,
        user: "Emma",
        profileUrl: "https://randomuser.me/api/portraits/women/35.jpg",
        userLink: "/users/emma",
        comment: "Great for entrepreneurs and startups.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/afJ0y2-WNfM",
  },
  {
    id: 19,
    title: "Man’s Search for Meaning",
    author: "Viktor E. Frankl",
    img: "https://books.google.co.in/books/publisher/content?id=8UNRDwAAQBAJ&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U3I5s1DPoopqmtAJLVO6VafZeDxDw&w=1280",
    rating: 4.8,
    price: 420,
    description:
      "Psychiatrist’s memoir about surviving the Holocaust and finding purpose.",
    reviews: [
      {
        id: 26,
        user: "Sophia",
        profileUrl: "https://randomuser.me/api/portraits/women/44.jpg",
        userLink: "/users/sophia",
        comment: "Deeply moving and insightful.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/0a4N6apkz_8",
  },
  {
    id: 20,
    title: "Quiet",
    author: "Susan Cain",
    img: "https://books.google.co.in/books/content?id=O6gZJa9kdlYC&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U076LrQ0eRrpOu3Fo240wN-FotZvw&w=1280",
    rating: 4.5,
    price: 440,
    description: "The power of introverts in a world that can’t stop talking.",
    reviews: [
      {
        id: 27,
        user: "Olivia",
        profileUrl: "https://randomuser.me/api/portraits/women/34.jpg",
        userLink: "/users/olivia",
        comment: "Eye-opening for introverts.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/g-Rzh4B9ibM",
  },
  {
    id: 21,
    title: "Grit",
    author: "Angela Duckworth",
    img: "https://books.google.co.in/books/publisher/content?id=Xh2rEAAAQBAJ&pg=PA1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U3P_ZpG7gGY9SzayTmp42XrMugIRQ&w=1280",
    rating: 4.3,
    price: 380,
    description: "The power of passion and perseverance.",
    reviews: [
      {
        id: 28,
        user: "Jack",
        profileUrl: "https://randomuser.me/api/portraits/men/29.jpg",
        userLink: "/users/jack",
        comment: "Motivational and practical.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/H14bBuluwB8",
  },
  {
    id: 22,
    title: "Outliers",
    author: "Malcolm Gladwell",
    img: "https://books.google.co.in/books/content?id=ialrgIT41OAC&pg=PA1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U3NLBOshwZWpNXsbpMglzJmig1yXQ&w=1280",
    rating: 4.2,
    price: 400,
    description: "Why some people succeed and others don’t.",
    reviews: [
      {
        id: 29,
        user: "Emily",
        profileUrl: "https://randomuser.me/api/portraits/women/19.jpg",
        userLink: "/users/emily",
        comment: "Great storytelling and insights.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/7l-CxYbaoG0",
  },
  {
    id: 23,
    title: "The War of Art",
    author: "Steven Pressfield",
    img: "https://books.google.co.in/books/publisher/content?id=sR3hAAAAQBAJ&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U0W5jn0ZLsJnmt56Hcsg0bPqLyhKw&w=1280",
    rating: 4.1,
    price: 370,
    description: "Break through creative blocks and win your inner battles.",
    reviews: [
      {
        id: 30,
        user: "Lucas",
        profileUrl: "https://randomuser.me/api/portraits/men/38.jpg",
        userLink: "/users/lucas",
        comment: "Motivational and raw.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/-esGykKrdb8",
  },
  {
    id: 24,
    title: "The Art of Happiness",
    author: "Dalai Lama",
    img: "https://m.media-amazon.com/images/I/61kCN2ZV1eL.jpg",
    rating: 4.6,
    price: 460,
    description: "A spiritual guide to lasting happiness.",
    reviews: [
      {
        id: 31,
        user: "Amelia",
        profileUrl: "https://randomuser.me/api/portraits/women/20.jpg",
        userLink: "/users/amelia",
        comment: "Peaceful and uplifting.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/00DqVhW6de0",
  },
  {
    id: 25,
    title: "Daring Greatly",
    author: "Brené Brown",
    img: "https://m.media-amazon.com/images/I/5176nHPg2IL._SY445_SX342_.jpg",
    rating: 4.4,
    price: 430,
    description:
      "How vulnerability can transform the way we live, love, and lead.",
    reviews: [
      {
        id: 32,
        user: "Ella",
        profileUrl: "https://randomuser.me/api/portraits/women/52.jpg",
        userLink: "/users/ella",
        comment: "Empowering and heartfelt.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/qIEL-9508z0",
  },

  {
    id: 26,
    title: "Start with Why",
    author: "Simon Sinek",
    img: "https://kitabhut.in/cdn/shop/files/IMG20240322150806.jpg?v=1711338507",
    rating: 4.5,
    price: 400,
    description: "How great leaders inspire action by focusing on why.",
    reviews: [
      {
        id: 33,
        user: "Noah",
        profileUrl: "https://randomuser.me/api/portraits/men/51.jpg",
        userLink: "/users/noah",
        comment: "Changed my perspective on leadership.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/u4ZoJKF_VuA",
  },

  {
    id: 27,
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    img: "https://images-na.ssl-images-amazon.com/images/I/91b0C2YNSrL.jpg",
    rating: 4.7,
    price: 550,
    description:
      "The story of Kvothe, a magically gifted young man, as he grows into a legendary figure.",
    reviews: [
      {
        id: 34,
        user: "Zoe",
        profileUrl: "https://randomuser.me/api/portraits/women/48.jpg",
        userLink: "/users/zoe",
        comment: "Captivating world-building and unforgettable characters.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/1Q6BfiW1dvc",
  },

  {
    id: 28,
    title: "The Call of the Wild",
    author: "Jack London",
    img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRbcEE2tWs1aQmnqbD0kRgEUgqeLKXzyR5bUyG6aLj7xrIhEZ7_79aRAzE9PTEZlb8FqqjL",
    rating: 4.5,
    price: 399,
    description:
      "A gripping tale of Buck, a domesticated dog who is thrust into the wilds of the Yukon during the Klondike Gold Rush.",
    reviews: [
      {
        id: 35,
        user: "Ella",
        profileUrl: "https://randomuser.me/api/portraits/women/52.jpg",
        userLink: "/users/ella",
        comment: "An inspiring story of survival and resilience.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/5P8R2zAhEwg",
  },

  {
    id: 29,
    title: "Drive",
    author: "Daniel H. Pink",
    img: "https://books.google.co.in/books/content?id=l6x0a-jkoGUC&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U3nk6eieuw8kxom3nhnSNY-dlwp-g&w=1280",
    rating: 4.2,
    price: 410,
    description: "The surprising truth about what motivates us.",
    reviews: [
      {
        id: 36,
        user: "Jack",
        profileUrl: "https://randomuser.me/api/portraits/men/29.jpg",
        userLink: "/users/jack",
        comment: "Changed how I motivate myself and others.",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/u6XAPnuFjJc",
  },

  {
    id: 30,
    title: "Mindset",
    author: "Carol S. Dweck",
    img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcREK4jTh0inrERRTQXZTZyOXGBtnuVIv2_fQztFSqb_TE_tn6ZU",
    rating: 4.5,
    price: 430,
    description: "The new psychology of success, focusing on growth mindset.",
    reviews: [
      {
        id: 37,
        user: "Lily",
        profileUrl: "https://randomuser.me/api/portraits/women/39.jpg",
        userLink: "/users/lily",
        comment: "Encouraging and insightful.",
      },
    ],
    videoUrl: "https://www.youtube.com//embed/Ijbz2fPKsD0",
  },
];

export default books;
