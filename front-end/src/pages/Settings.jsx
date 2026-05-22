import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import { getStoredUser, setStoredUser } from "../utils/auth";

function Settings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  const [passMessage, setPassMessage] = useState("");
  const [passError, setPassError] = useState("");
  const [passLoading, setPassLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    async function fetchEmail() {
      try {
        const res = await api.get("/auth/me");
        setEmail(res.data.email);
        setNewEmail(res.data.email);
      } catch {
        setEmail("user@example.com");
        setNewEmail("user@example.com");
      }
    }
    fetchEmail();

    const savedTheme = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedTheme);
    applyDarkMode(savedTheme);
  }, []);

  const applyDarkMode = (enabled) => {
    if (enabled) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    applyDarkMode(newMode);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPassMessage("");
    setPassError("");

    if (newPassword !== confirmPassword) {
      setPassError("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setPassError("New password must be at least 6 characters");
      return;
    }

    setPassLoading(true);
    try {
      const res = await api.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      setPassMessage(res.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPassError(err.response?.data?.message || "Error changing password");
    } finally {
      setPassLoading(false);
    }
  };

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    setEmailMessage("");
    setEmailError("");

    if (!newEmail.includes("@")) {
      setEmailError("Please enter a valid email");
      return;
    }
    if (newEmail === email) {
      setEmailError("New email is same as current email");
      return;
    }

    setEmailLoading(true);
    try {
      const res = await api.post("/auth/change-email", { newEmail });
      const updatedEmail = res.data.updatedEmail || newEmail;
      setEmail(updatedEmail);
      const storedUser = getStoredUser();
      setStoredUser({ ...(storedUser || {}), ...(res.data.user || {}), email: updatedEmail });
      setEmailMessage("Email updated successfully!");
    } catch (err) {
      setEmailError(err.response?.data?.message || "Error updating email");
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <>
      {/*  Bookstore Theme Styles */}
      <style>{`
        body {
          font-family: 'Georgia', serif;
          background-color: #fdf6e3;
        }
        .settings-card {
          background: #fffaf3;
          border: 2px solid #d4b483;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(139, 69, 19, 0.15);
        }
        .settings-card h5 {
          color: #f1e4dcff;
          font-weight: bold;
          margin-bottom: 15px;
        }
        .form-control {
          border-radius: 6px;
          border: 1px solid #c1a57b;
        }
        .btn-primary {
          background-color: #8b5e3c;
          border: none;
        }
        .btn-primary:hover {
          background-color: #6f4a2f;
        }
        .btn-info {
          background-color: #d4b483;
          border: none;
          color: #4a2f1b;
        }
        .btn-info:hover {
          background-color: #c1a57b;
        }
        .alert-success {
          background-color: #e0d3b8;
          color: #4a2f1b;
          border: none;
        }
        .alert-danger {
          background-color: #f2d0a9;
          color: #5b3924;
          border: none;
        }
        body.dark-mode {
          background-color: #3b2a20;
          color: #eee;
        }
        body.dark-mode .settings-card {
          background: #4a3a2b;
          border-color: #c1a57b;
        }
      `}</style>

      <div className="container" style={{ maxWidth: 450, marginTop: 40 }}>
        <div className="settings-card">
          <h2 className="mb-4"> Settings</h2>

          {/* Dark mode toggle */}
          <div className="mb-4">
            <label htmlFor="darkModeToggle" className="form-label">
               Dark Mode:
            </label>
            <input
              id="darkModeToggle"
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
              style={{ marginLeft: 10, cursor: "pointer" }}
            />
          </div>

          {/* Change Email */}
          <form onSubmit={handleEmailUpdate} className="mb-5">
            <h5> Update Email</h5>
            <input
              type="email"
              className="form-control mb-3"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              disabled={emailLoading}
              required
            />
            <button
              type="submit"
              className="btn btn-info w-100"
              disabled={emailLoading}
            >
              {emailLoading ? "Updating..." : "Update Email"}
            </button>
            {emailMessage && (
              <div className="alert alert-success mt-3">{emailMessage}</div>
            )}
            {emailError && (
              <div className="alert alert-danger mt-3">{emailError}</div>
            )}
          </form>

          {/* Change Password */}
          <form onSubmit={handlePasswordChange}>
            <h5> Change Password</h5>
            <input
              type="password"
              placeholder="Current Password"
              className="form-control mb-3"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              disabled={passLoading}
            />
            <input
              type="password"
              placeholder="New Password"
              className="form-control mb-3"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={passLoading}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="form-control mb-3"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={passLoading}
            />
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={passLoading}
            >
              {passLoading ? "Changing..." : "Change Password"}
            </button>

            {passMessage && (
              <div className="alert alert-success mt-3">{passMessage}</div>
            )}
            {passError && (
              <div className="alert alert-danger mt-3">{passError}</div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Settings;
