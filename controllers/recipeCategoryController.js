const con = require("../config/db");
const Joi = require("joi");

// ✅ Schema Validation
const categorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional()
});

// ✅ Create Category
exports.createCategory = async (req, res) => {
  try {
    await categorySchema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, description } = req.body;
  const query = "INSERT INTO recipe_categories (name, description) VALUES (?, ?)";
  con.query(query, [name, description], (err, result) => {
    if (err) return res.status(500).json({ message: "Error adding category" });
    res.status(201).json({ message: "✅ Category added successfully", id: result.insertId });
  });
};

// ✅ Get All Categories
exports.getCategories = (req, res) => {
  con.query("SELECT * FROM recipe_categories", (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching categories" });
    res.json(results);
  });
};

// ✅ Get Single Category
exports.getCategoryById = (req, res) => {
  con.query("SELECT * FROM recipe_categories WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: "Error fetching category" });
    if (result.length === 0) return res.status(404).json({ message: "❌ Category not found" });
    res.json(result[0]);
  });
};

// ✅ Update Category
exports.updateCategory = async (req, res) => {
  try {
    await categorySchema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, description } = req.body;
  const query = "UPDATE recipe_categories SET name=?, description=? WHERE id=?";
  con.query(query, [name, description, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: "Error updating category" });
    res.json({ message: "✅ Category updated successfully" });
  });
};

// ✅ Delete Category
exports.deleteCategory = (req, res) => {
  con.query("DELETE FROM recipe_categories WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: "Error deleting category" });
    res.json({ message: "✅ Category deleted successfully" });
  });
};
