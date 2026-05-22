import React, { useEffect, useMemo, useState } from "react";
import avatarImage from "../assets/siddiq.jpg";
import "./Profile.css";
import { api } from "../utils/api";
import { getStoredUser, getUserDisplayName, setStoredUser } from "../utils/auth";

const emptyProfile = {
  fullName: "",
  username: "",
  email: "",
  phone: "",
  address: "",
  bio: "",
  avatar: avatarImage,
};

const Profile = () => {
  const storedUser = getStoredUser();
  const fallbackProfile = useMemo(
    () => ({
      ...emptyProfile,
      fullName: storedUser?.fullName || getUserDisplayName(storedUser),
      username: storedUser?.username || storedUser?.email?.split("@")[0] || "",
      email: storedUser?.email || "",
    }),
    [storedUser]
  );

  const [user, setUser] = useState(fallbackProfile);
  const [form, setForm] = useState(fallbackProfile);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError("");

      try {
        const res = await api.get("/auth/me");
        const profileData = {
          ...emptyProfile,
          ...res.data,
          fullName:
            res.data.fullName || getUserDisplayName(res.data) || res.data.username,
          avatar: avatarImage,
        };

        setUser(profileData);
        setForm(profileData);
        setStoredUser({
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          fullName: profileData.fullName,
          phone: res.data.phone || "",
          address: res.data.address || "",
          bio: res.data.bio || "",
        });
      } catch (err) {
        setError(err.response?.data?.error || "Unable to load profile");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));
    setMessage("");
    setError("");
  };

  const handleCancel = () => {
    setForm(user);
    setEditMode(false);
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const payload = {
        fullName: form.fullName.trim(),
        username: form.username.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        bio: form.bio.trim(),
      };

      const res = await api.put("/auth/profile", payload);
      const updatedProfile = {
        ...emptyProfile,
        ...res.data.user,
        avatar: avatarImage,
      };

      setUser(updatedProfile);
      setForm(updatedProfile);
      setStoredUser(updatedProfile);
      setMessage(res.data.message || "Profile updated successfully");
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.error || "Unable to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <p className="profile-feedback">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img src={user.avatar} alt="User Avatar" className="profile-avatar" />
          <div className="profile-header-copy">
            <p className="profile-kicker">Book Souls Member</p>
            <h1>{user.fullName || getUserDisplayName(user)}</h1>
            <p className="profile-username">@{user.username || "reader"}</p>
          </div>
        </div>

        {message && <div className="profile-message success">{message}</div>}
        {error && <div className="profile-message error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="profile-grid">
            <div className="profile-field">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange}
                disabled={!editMode || saving}
              />
            </div>

            <div className="profile-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                disabled={!editMode || saving}
              />
            </div>

            <div className="profile-field profile-field-full">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                disabled
              />
            </div>

            <div className="profile-field">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                disabled={!editMode || saving}
              />
            </div>

            <div className="profile-field profile-field-full">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                rows="3"
                value={form.address}
                onChange={handleChange}
                disabled={!editMode || saving}
              />
            </div>

            <div className="profile-field profile-field-full">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                rows="4"
                value={form.bio}
                onChange={handleChange}
                disabled={!editMode || saving}
              />
            </div>
          </div>

          <div className="profile-actions">
            {editMode ? (
              <>
                <button
                  type="button"
                  className="profile-btn profile-btn-secondary"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="profile-btn profile-btn-primary"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Profile"}
                </button>
              </>
            ) : (
              <button
                type="button"
                className="profile-btn profile-btn-primary"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
