const express = require("express");
const router = express.Router();
const popularController = require("../controllers/popularController");

// ✅ Define Routes
router.get("/", popularController.getPopularRecipes);

module.exports = router;
