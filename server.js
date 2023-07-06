require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
// npm i body-parser -- FA
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes"); // --FA
const postsRoutes = require("./routes/posts"); 

const PORT = process.env.PORT;
const pool = require("./db");
//Moving up
app.use(cors());
app.use(express.json());

pool
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database:", err);
  });

app.use("/images", express.static("images"));
app.use("/post", require("./routes/posts"));
app.use("/users", userRoutes);
app.use("/admin", adminRoutes); // Added -- FA
app.use("/posts", postsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
