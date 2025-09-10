import Lead from "../models/Lead.js";
import Opportunity from "../models/Opportunity.js";

// GET /api/dashboard/stats
export const getDashboardStats = async (req, res) => {
  try {
    // Leads grouped by status
    const leadsByStatus = await Lead.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // Opportunities grouped by stage
    const oppsByStage = await Opportunity.aggregate([
      { $group: { _id: "$stage", count: { $sum: 1 } } },
    ]);

    res.json({
      leadsByStatus,
      oppsByStage,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
