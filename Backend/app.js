const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
app.use(express.json());

const mongoURL =
  "mongodb+srv://vohuy177:admin@coffeeshop.eg3ib.mongodb.net/?retryWrites=true&w=majority&appName=CoffeeShop";

const JWT_SECRET = "baitaplonmobile";

mongoose.connect(mongoURL).then(() => {
  console.log("MongoDB connected");
});

require("./User");

const User = mongoose.model("User");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    return res.send({ status: "User already exists. Please login" });
  }

  try {
    await User.create({
      name: name,
      email: email,
      password,
    });
    res.send({ status: "ok", data: "User created successfully" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const oldUser = await User.findOne({ email: email, password });

  if (!oldUser) {
    return res.send({ data: "User does not exist" });
  }

  // if (await bcrypt.compare(password, oldUser.password)) {
  //   const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);

  if (res.status(201)) {
    return res.send({ status: "ok" });
  } else {
    return res.send({ error: "error" });
  }
  // }
});

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
