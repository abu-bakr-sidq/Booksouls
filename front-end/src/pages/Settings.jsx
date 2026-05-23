import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import { getStoredUser, setStoredUser } from "../utils/auth";
import "./StorePages.css";

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
    <div className="store-page-shell">
      <div className="settings-shell">
        <div className="store-page-card settings-card">
          <h2 className="mb-4 store-section-title">Settings</h2>

          <div className="settings-block">
            <div className="settings-inline-toggle">
              <label htmlFor="darkModeToggle" className="form-label mb-0 fw-bold">
                Dark Mode
              </label>
              <input
                id="darkModeToggle"
                type="checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
            </div>
          </div>

          <form onSubmit={handleEmailUpdate} className="settings-block">
            <h5 className="store-section-title fs-4 mb-3">Update Email</h5>
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
              className="btn store-secondary-btn w-100"
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

          <form onSubmit={handlePasswordChange} className="settings-block">
            <h5 className="store-section-title fs-4 mb-3">Change Password</h5>
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
              className="btn store-primary-btn w-100"
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
    </div>
  );
}

export default Settings;
