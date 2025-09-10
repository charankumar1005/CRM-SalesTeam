import express from "express";
import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
} from "../controllers/leadController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { convertLead } from "../controllers/leadController.js";
const router = express.Router();

router.use(requireAuth); // all lead routes are protected

router.get("/", getLeads);
router.post("/", createLead);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);
router.post("/:id/convert", convertLead);

export default router;
