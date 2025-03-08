const express = require("express");
const router = express.Router();
const {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback
} = require("../controllers/feedbackController");

// ✅ Define Routes
router.post("/", createFeedback);
router.get("/", getAllFeedbacks);
router.get("/:id", getFeedbackById);
router.put("/:id", updateFeedback);
router.delete("/:id", deleteFeedback);

module.exports = router;
