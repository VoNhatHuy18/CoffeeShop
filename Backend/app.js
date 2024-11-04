const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5001;
app.use(express.json());

const mongoURL =
  "mongodb+srv://vohuy177:admin@coffeeshop.eg3ib.mongodb.net/?retryWrites=true&w=majority&appName=CoffeeShop";

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

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
