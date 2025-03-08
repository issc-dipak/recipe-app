const con = require("../config/db");
const Joi = require("joi");

// ✅ Feedback Schema Validation
const feedbackSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  recipe_id: Joi.number().integer().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().trim().required(),
});

// ✅ Create Feedback
exports.createFeedback = async (req, res) => {
  try {
    await feedbackSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { user_id, recipe_id, rating, comment } = req.body;
  const query = "INSERT INTO feedback (user_id, recipe_id, rating, comment) VALUES (?, ?, ?, ?)";

  con.query(query, [user_id, recipe_id, rating, comment], (err, result) => {
    if (err) return res.status(500).json({ message: "❌ Error adding feedback", error: err });
    res.status(201).json({ message: "✅ Feedback added successfully", id: result.insertId });
  });
};

// ✅ Fetch All Feedbacks
exports.getAllFeedbacks = (req, res) => {
  con.query("SELECT * FROM feedback", (err, results) => {
    if (err) return res.status(500).json({ message: "❌ Error fetching feedback", error: err });
    res.json(results);
  });
};

// ✅ Fetch Feedback by ID
exports.getFeedbackById = (req, res) => {
  con.query("SELECT * FROM feedback WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: "❌ Error fetching feedback", error: err });
    if (result.length === 0) return res.status(404).json({ message: "❌ Feedback not found" });
    res.json(result[0]);
  });
};

// ✅ Update Feedback
exports.updateFeedback = async (req, res) => {
  try {
    await feedbackSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { user_id, recipe_id, rating, comment } = req.body;
  const query = "UPDATE feedback SET user_id=?, recipe_id=?, rating=?, comment=? WHERE id=?";

  con.query(query, [user_id, recipe_id, rating, comment, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: "❌ Error updating feedback", error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "❌ Feedback not found" });
    res.json({ message: "✅ Feedback updated successfully" });
  });
};

// ✅ Delete Feedback
exports.deleteFeedback = (req, res) => {
  con.query("DELETE FROM feedback WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: "❌ Error deleting feedback", error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "❌ Feedback not found" });
    res.json({ message: "✅ Feedback deleted successfully" });
  });
};
