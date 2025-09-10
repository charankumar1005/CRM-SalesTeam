import express from "express";
import {
  getOpportunities,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
} from "../controllers/opportunityController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", getOpportunities);
router.post("/", createOpportunity);
router.put("/:id", updateOpportunity);
router.delete("/:id", deleteOpportunity);

export default router;
