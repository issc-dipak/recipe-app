const con = require("../config/db");

// ✅ Get Popular Recipes (Based on Most Favorites)
exports.getPopularRecipes = (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Default to 10 recipes

  const query = `
    SELECT r.*, COUNT(f.recipe_id) AS favorite_count
    FROM recipes r
    JOIN favorites f ON r.id = f.recipe_id
    GROUP BY r.id
    ORDER BY favorite_count DESC
    LIMIT ?;
  `;

  con.query(query, [limit], (err, results) => {
    if (err) {
      console.error("❌ Error fetching popular recipes:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.json({ status: "success", data: results });
  });
};
