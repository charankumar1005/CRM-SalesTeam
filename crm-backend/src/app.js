import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import opportunityRoutes from "./routes/opportunityRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { requireAuth } from "./middleware/authMiddleware.js";


dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);



app.get("/api/protected", requireAuth, (req, res) => {
  res.json({ message: `Hello ${req.user.role}, you are authorized!` });
});


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/opportunities", opportunityRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
