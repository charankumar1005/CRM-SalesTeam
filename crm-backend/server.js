import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./src/app.js";

dotenv.config();

// Connect DB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
