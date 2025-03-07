const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getLatestRecipes
} = require("../controllers/recipesController");

const router = express.Router();

// ✅ Multer Storage Configuration
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ✅ Define Routes
router.post("/add", upload.single("add_image"), addRecipe);
router.get("/", getAllRecipes);
router.get("/latest", getLatestRecipes);  // ✅ GET Latest Recipes
router.get("/:id", getRecipeById);
router.put("/:id", upload.single("add_image"), updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
