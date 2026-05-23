import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import siddiq from "../assets/siddiq.jpg";
import {
  clearStoredAuth,
  getStoredUser,
  getUserDisplayName,
} from "../utils/auth";

function MenuBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(() => getStoredUser());
  const dropdownRef = useRef(null);

  useEffect(() => {
    const syncUser = () => {
      setUser(getStoredUser());
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    syncUser();
    window.addEventListener("authchange", syncUser);
    window.addEventListener("storage", syncUser);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("authchange", syncUser);
      window.removeEventListener("storage", syncUser);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  const displayName = getUserDisplayName(user);
  const userEmail = user?.email || "reader@booksouls.com";

  const handleLogout = () => {
    clearStoredAuth();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backdropFilter: "blur(8px)",
        background: "rgba(245, 235, 220, 0.95)",
        padding: "0.8rem 2rem",
        boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        borderBottom: "1px solid rgba(150,100,50,0.3)",
      }}
    >
      <div className="container-fluid menu-shell">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
            alt="Booksouls Logo"
            style={{
              height: "40px",
              marginRight: "12px",
              filter: "drop-shadow(1px 1px 2px #8B5E3C)",
            }}
          />
          <span
            style={{
              fontFamily: "'Merriweather', serif",
              fontSize: "1.6rem",
              fontWeight: "700",
              color: "#6B4C3B",
              letterSpacing: "1px",
            }}
          >
            Booksouls
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            border: "1px solid #6B4C3B",
            background: "rgba(200,180,150,0.2)",
            padding: "8px",
            borderRadius: "8px",
          }}
        >
          <span
            className="navbar-toggler-icon"
            style={{ filter: "invert(0.3)" }}
          ></span>
        </button>

        <div className={`menu-panel ${menuOpen ? "menu-panel-open" : ""}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item mx-2">
              <Link
                to="/home"
                className="nav-link"
                style={{ color: "#6B4C3B", fontWeight: "600" }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link
                to="/books"
                className="nav-link"
                style={{ color: "#6B4C3B", fontWeight: "600" }}
              >
                Browse Books
              </Link>
            </li>

            <li
              className="nav-item dropdown ms-3 position-relative"
              ref={dropdownRef}
            >
              <button
                className="btn d-flex align-items-center profile-trigger"
                style={{
                  background: "rgba(210,180,140,0.3)",
                  border: "1px solid rgba(150,100,50,0.6)",
                  padding: "10px 20px",
                  borderRadius: "30px",
                  fontWeight: "600",
                  color: "#4B2E2E",
                  boxShadow: "0 3px 12px rgba(150,100,50,0.2)",
                  gap: "10px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  backdropFilter: "blur(4px)",
                }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={siddiq}
                  alt="Account Logo"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #8B5E3C",
                  }}
                />
                <span className="profile-trigger-name" title={displayName}>
                  {displayName}
                </span>
              </button>

              {dropdownOpen && (
                <ul
                  className="dropdown-menu dropdown-menu-end show profile-dropdown"
                  style={{
                    background: "rgba(240,230,210,0.95)",
                    borderRadius: "16px",
                    boxShadow: "0 10px 25px rgba(150,100,50,0.3)",
                    minWidth: "220px",
                    padding: "8px 0",
                    animation: "slideFade 0.25s ease forwards",
                    color: "#4B2E2E",
                  }}
                >
                  <li className="px-3 pb-2">
                    <div
                      style={{
                        borderRadius: "12px",
                        background: "rgba(255, 248, 240, 0.95)",
                        border: "1px solid rgba(150,100,50,0.15)",
                        padding: "12px 14px",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "700",
                          color: "#6B4C3B",
                          marginBottom: "2px",
                          lineHeight: "1.25",
                        }}
                      >
                        {displayName}
                      </div>
                      <div
                        style={{
                          fontSize: "0.88rem",
                          color: "#8B6B56",
                          overflowWrap: "anywhere",
                          lineHeight: "1.45",
                        }}
                      >
                        {userEmail}
                      </div>
                    </div>
                  </li>
                  <li>
                    <hr
                      style={{
                        margin: "4px 0 8px",
                        borderColor: "rgba(150,100,50,0.2)",
                      }}
                    />
                  </li>
                  {["Profile", "Settings"].map((label) => (
                    <li key={label}>
                      <Link
                        className="dropdown-item"
                        to={`/${label.toLowerCase()}`}
                        onClick={() => setDropdownOpen(false)}
                        style={{
                          fontWeight: "500",
                          padding: "12px 20px",
                          borderRadius: "8px",
                          color: "#4B2E2E",
                        }}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <hr
                      style={{
                        margin: "8px 0",
                        borderColor: "rgba(150,100,50,0.2)",
                      }}
                    />
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      style={{
                        fontWeight: "500",
                        padding: "12px 20px",
                        borderRadius: "8px",
                        background: "transparent",
                        border: "none",
                        width: "100%",
                        textAlign: "left",
                        cursor: "pointer",
                        color: "#B22222",
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>

      <style>
        {`
          @keyframes slideFade {
            0% { opacity: 0; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .menu-panel {
            display: flex;
            flex-grow: 1;
            justify-content: flex-end;
          }

          .menu-shell {
            width: min(100%, 1440px);
            margin: 0 auto;
            padding-left: clamp(0.35rem, 1vw, 0.75rem);
            padding-right: clamp(0.35rem, 1vw, 0.75rem);
          }

          .profile-trigger {
            max-width: 240px;
          }

          .profile-trigger-name {
            display: inline-block;
            max-width: 138px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .profile-dropdown {
            position: absolute !important;
            top: calc(100% + 12px) !important;
            right: 0 !important;
            left: auto !important;
            width: 260px;
            max-width: min(320px, calc(100vw - 32px));
            border: 1px solid rgba(150,100,50,0.18);
            overflow: hidden;
          }

          @media (max-width: 991.98px) {
            .menu-panel {
              display: none;
              width: 100%;
              padding-top: 14px;
            }

            .menu-panel.menu-panel-open {
              display: block;
            }

            .menu-panel .navbar-nav {
              align-items: stretch !important;
            }

            .menu-panel .nav-item {
              margin: 0 0 10px 0 !important;
            }

            .menu-panel .nav-link {
              padding-left: 0;
              padding-right: 0;
            }

            .menu-panel .dropdown {
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: flex-end;
            }

            .profile-trigger {
              width: min(100%, 290px);
              max-width: 290px;
              justify-content: flex-start;
            }

            .profile-trigger-name {
              max-width: 170px;
            }

            .profile-dropdown {
              position: static !important;
              transform: none !important;
              inset: auto !important;
              width: min(100%, 290px);
              min-width: 0 !important;
              margin-top: 10px !important;
              margin-left: auto !important;
              padding-top: 6px;
              padding-bottom: 6px;
            }

            .profile-dropdown .dropdown-item {
              padding-top: 10px !important;
              padding-bottom: 10px !important;
            }
          }
        `}
      </style>
    </nav>
  );
}

export default MenuBar;
