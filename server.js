const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/admissionDB")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// Schema
const studentSchema = new mongoose.Schema({
  name: String,
  course: String,
  status: { type: String, default: "Pending" },
});

const Student = mongoose.model("Student", studentSchema);

// GET students
app.get("/api/students", async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

app.post("/api/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json({ message: "Added" });
});

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});
