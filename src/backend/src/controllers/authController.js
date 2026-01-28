const bcrypt = require("bcrypt");
const {
  findUserByEmail,
  createUser,
} = require("../models/userModel");

/**
 * =========================
 * Register Controller
 * =========================
 */
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        error: "Email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await createUser(name, email, hashedPassword);

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({
      error: "Server error",
    });
  }
};

/**
 * =========================
 * Login Controller
 * =========================
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  try {
    // Find user by email
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Remove password from response
    const { password: _, ...safeUser } = user;

    return res.json({
      message: "Login successful",
      user: safeUser,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      error: "Server error",
    });
  }
};

module.exports = {
  register,
  login,
};

