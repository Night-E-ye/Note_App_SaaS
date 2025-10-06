const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const subscriptionRoutes = require("./routes/subscription");
const noteRoutes = require("./routes/noteRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
app.use(express.json());
const path = require("path");

// MongoDB connection
const MONGO_URI =
  (process.env.MONGOOSE_URL);
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Note-Taking App API");
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/api/payment", paymentRoutes);
// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/notes", noteRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
