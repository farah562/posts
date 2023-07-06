const pool = require("../db");
const { jwtGenerator } = require("../utils/jwtGenerator");
const bcrypt = require("bcrypt");
require("dotenv").config();
const validInfo = require("../utils/UservalidInfo");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists. Please log in.");
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    const token = jwtGenerator(newUser.rows[0]);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Email or password is incorrect");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Email or password is incorrect");
    }

    const user_info = user.rows[0];

    const token = jwtGenerator(user_info);
    return res.json({ token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

// Get user posts on users page -- FA

const getUserPosts = async (req, res) => {
  let userId = req.params.userId;
  try {
    const result = await pool.query(
      "SELECT id, title, description, likes, status FROM post WHERE user_id = $1",
      [userId]
    );

    const allPosts = result.rows;

    console.log(allPosts);

    res.status(200).json(allPosts);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  login,
  signup,
  getUserPosts,
};
