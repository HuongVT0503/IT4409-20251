//user:huongvt
//passs: Ps72zGaREQg00eOj
//cluster0.ksx2wui.mongodb.net
//mongodb+srv://huongvt:<db_password>@cluster0.ksx2wui.mongodb.net/

// 1 file .js chứa toàn bộ mã nguồn (kết nối MongoAtlas, xử lý APIs)
// 4 ảnh minh họa Postman với thao tác CRUD
// 1 ảnh chụp bản thân + bảng trên lớp
// Lưu ý:
// MongoDB truy cập qua user-password với user là MSSV; tên Collection là tên email của các bạn. Ví dụ MSSV là 2020123456; Collection là minh.nn20123456.
// Nếu file .js không upload được, có thể đổi đuôi file sang .txt. Không nén các files thành một file chung.

//user: 20225135
//pass: 0g6NFfHP1d65PdVm

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); //middleware to parse JSON request body

const uri =
  "mongodb+srv://20225135:0g6NFfHP1d65PdVm@cluster0.ksx2wui.mongodb.net/?appName=Cluster0";
const collectionName = "huong.vt225135";

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Connection error:", err));

// const client = new MongoClient(uri);

const userSchema = new mongoose.Schema({
  //dont need _id because it's auto created by mongodb
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, min: 0 },
});

const User = mongoose.model("User", userSchema, collectionName); //create a model based on the schema

///

//CRUD

//CREATE
app.post("/api/users", async (req, res) => {
  try {
    const newUser = await User.create(req.body); //BODY
    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//READ all
app.get("/api/users", async (res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//UPDATE
app.put("/api/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); //new: true to return the updated document
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//DELETE
app.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
