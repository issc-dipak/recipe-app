const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipes");
const adsRoutes = require("./routes/adsRoutes");
const searchRoutes = require("./routes/searchRoutes");
const popularRoutes = require("./routes/popularRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads")); // ✅ Serve uploaded images

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/ads", adsRoutes);
app.use("/api", searchRoutes);
app.use("/api/popular", popularRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
