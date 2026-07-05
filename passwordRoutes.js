const express = require("express");
const router = express.Router();

const Password = require("../models/Password");


// Add Password

router.post("/", async (req, res) => {
  try {
    const password = await Password.create(req.body);

    res.status(201).json(password);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// Get All Passwords

router.get("/", async (req, res) => {
  try {
    const passwords = await Password.find().sort({
      createdAt: -1,
    });

    res.json(passwords);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// Get One Password

router.get("/:id", async (req, res) => {
  try {
    const password = await Password.findById(req.params.id);

    if (!password) {
      return res.status(404).json({
        message: "Record Not Found",
      });
    }

    res.json(password);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// Delete Password

router.delete("/:id", async (req, res) => {
  try {
    await Password.findByIdAndDelete(req.params.id);

    res.json({
      message: "Password Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;