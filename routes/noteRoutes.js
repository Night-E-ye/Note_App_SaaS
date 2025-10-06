const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const authenticate = require("../middleware/authenticate"); // JWT middleware

// Create note
router.post("/", authenticate, async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content, user: req.user.id });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to create note" });
  }
});

// Get all notes for the logged-in user
router.get("/", authenticate, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});


// Update note
router.put("/:id", authenticate, async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, content },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to update note" });
  }
});

// Delete note
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete note" });
  }
});

module.exports = router;
