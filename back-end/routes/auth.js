const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "bookstore_dev_secret";

router.post("/register", async (req, res) => {
  const { username, email, password, fullName, phone, address, bio } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      fullName: fullName || username,
      phone: phone || "",
      address: address || "",
      bio: bio || "",
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username, role: "user" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName || user.username,
        phone: user.phone || "",
        address: user.address || "",
        bio: user.bio || "",
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName || user.username,
      phone: user.phone || "",
      address: user.address || "",
      bio: user.bio || "",
    });
  } catch (err) {
    console.error("Fetch user error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/profile", authMiddleware, async (req, res) => {
  const { fullName, username, phone, address, bio } = req.body;

  try {
    const normalizedUsername = String(username || "").trim();
    const normalizedFullName = String(fullName || "").trim();

    if (!normalizedUsername) {
      return res.status(400).json({ error: "Username is required" });
    }

    const existingUser = await User.findOne({
      username: normalizedUsername,
      _id: { $ne: req.user.id },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        username: normalizedUsername,
        fullName: normalizedFullName || normalizedUsername,
        phone: String(phone || "").trim(),
        address: String(address || "").trim(),
        bio: String(bio || "").trim(),
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName || user.username,
        phone: user.phone || "",
        address: user.address || "",
        bio: user.bio || "",
      },
    });
  } catch (err) {
    console.error("Update profile error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/change-password", authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Change password error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/change-email", authMiddleware, async (req, res) => {
  const { newEmail } = req.body;

  try {
    const existingUser = await User.findOne({ email: newEmail });
    if (existingUser && String(existingUser._id) !== req.user.id) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { email: newEmail },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Email updated successfully",
      updatedEmail: user.email,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName || user.username,
        phone: user.phone || "",
        address: user.address || "",
        bio: user.bio || "",
      },
    });
  } catch (err) {
    console.error("Change email error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
