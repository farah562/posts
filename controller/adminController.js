const pool = require("../db");
const { jwtGenerator } = require("../utils/jwtGenerator");
const bcrypt = require("bcrypt");
require("dotenv").config();
const validInfo = require("../utils/UservalidInfo");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);

    const admin = await pool.query(
      "SELECT * FROM admin WHERE admin_email = $1",
      [email]
    );

    if (admin.rows.length === 0) {
      return res.status(401).json("Email or password is incorrect");
    }
    //   password,
    //   admin.rows[0].user_password
    // );

    const validPassword = password == "123456";

    if (!validPassword) {
      return res.status(401).json("Email or password is incorrect");
    }

    const admin_info = admin.rows[0];

    const token = jwtGenerator(admin_info);
    return res.json({ token: token, admin_info });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};


// get All posts from all users
const getAllWebPosts = async (req, res) => {
  try {
    const client = await pool.connect();

    const query =
      "SELECT post.id, post.title, post.description, post.likes, post.status, users.user_name FROM post JOIN users ON post.user_id = users.id";

    const result = await client.query(query);
    const allPosts = result.rows;

    client.release();

    res.status(200).json(allPosts);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Post

const deletePost = async (req, res, next) => {
  let postId = req.params.postId;
  try {
    const result = await pool.query("DELETE FROM post WHERE id = $1", [postId]);

    if (result) {
      return res.json({ postDeleted: true });
    }
  } catch (err) {
    console.error("Error deleting posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// confirm Post

const confirmPost = async (req, res, next) => {
  let postId = req.params.postId;
  try {
    const result = await pool.query(
      "UPDATE post SET status = 'confirmed' WHERE id = $1",
      [postId]
    );

    if (result) {
      return res.json({ postUpdated: true });
    }
  } catch (err) {
    console.error("Error updating posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get number of users

const getUser = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, user_email, user_name, deleted FROM users WHERE deleted = false"
    );

    const allUsers = result.rows;

    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete user

const deleteUser = async (req, res, next) => {
  let userId = req.params.userId;
  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1", [
      userId,
    ]);

    if (result) {
      return res.json({ userDeleted: true });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// add new admin

const addNewAdmin = async (req, res, next) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = "admin";

    const checkEmail = await pool.query(
      "SELECT admin_email FROM admin where admin_email = $1",
      [email]
    );

    if (checkEmail.rows.length == 0) {
      const all_records = await pool.query(
        "INSERT INTO admin (admin_name, admin_email, admin_password, deleted, role) VALUES($1, $2, $3 , $4, $5) RETURNING *",
        [username, email, password, false, role]
      );

      //Add JWT token
      let token;
      try {
        token = jwt.sign({ username: username, email: email }, secretKey, {
          expiresIn: "1h",
        });
      } catch (err) {
        const error = new HttpError(
          "Signing up failed, please try again.",
          500
        );
        return next(error);
      }

      all_records.rows[0].token = token;

      res.json(all_records.rows);
    } else {
      res.status(401).json({ message: "Email already exist" });
    }
  } catch (err) {
    console.log(err);
  }
};

// getAboutUsContent

const getAboutUsContent = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM aboutus");
    res.json(result.rows);
  } catch (err) {
    const error = new HttpError(
      "Could not fetch about us content, please try again.",
      500
    );
    return next(error);
  }
};

//getContactUsContent

const getContactUsContent = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM contactus");
    res.json(result.rows);
  } catch (err) {
    const error = new HttpError(
      "Could not fetch contact us content, please try again.",
      500
    );
    return next(error);
  }
};

// updateAboutUsContent

const updateAboutUsContent = async (req, res, next) => {
  let aboutUsText = req.body.aboutUsText;
  let whyChooseUs = req.body.whyChooseUs;

  try {
    if (aboutUsText && whyChooseUs) {
      let result = await pool.query(
        "UPDATE aboutus SET main_us_text = $1, why_choose_us = $2",
        [aboutUsText, whyChooseUs]
      );
      if (result) {
        res.json({ contentUpdated: true });
      }
    }
  } catch (err) {
    const error = new HttpError(
      "Could not update about us content, please try again.",
      500
    );
    return next(error);
  }
};


// updateContactUsContent

const updateContactUsContent = async (req, res, next) => {
  let ourLocation = req.body.ourLocation;
  let phoneNumber = req.body.phoneNumber;
  let email = req.body.email;

  try {
    let result = await pool.query(
      "UPDATE contactus SET our_location = $1, phonenumber = $2, email = $3",
      [ourLocation, phoneNumber, email]
    );
    if (result) {
      res.json({ contentUpdated: true });
    }
  } catch (err) {
    const error = new HttpError(
      "Could not update contact us content, please try again.",
      500
    );
    return next(error);
  }
};

// get user msgs
const getUsersMessages = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM users_feedback");

    res.json(result.rows);
  } catch (err) {
    const error = new HttpError(
      "Could not fetch messages, please try again.",
      500
    );

    return next(error);
  }
};



module.exports = {
  login,
  getAllWebPosts,
  deletePost,
  confirmPost,
  getUser,
  deleteUser,
  addNewAdmin,
  getAboutUsContent,
  getContactUsContent,
  updateAboutUsContent,
  updateContactUsContent,
  getUsersMessages,
};
