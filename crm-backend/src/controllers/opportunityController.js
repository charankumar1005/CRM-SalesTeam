import Opportunity from "../models/Opportunity.js";

// GET /api/opportunities
export const getOpportunities = async (req, res) => {
  try {
    let opportunities;
    if (req.user.role === "manager") {
      opportunities = await Opportunity.find();
    } else {
      opportunities = await Opportunity.find({ ownerId: req.user.sub });
    }
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// POST /api/opportunities
export const createOpportunity = async (req, res) => {
  try {
    const { title, value, stage, leadId } = req.body;
    const opportunity = await Opportunity.create({
      title,
      value,
      stage,
      leadId,
      ownerId: req.user.sub,
    });
    res.status(201).json(opportunity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/opportunities/:id
export const updateOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) return res.status(404).json({ message: "Not found" });

    if (req.user.role === "rep" && opportunity.ownerId.toString() !== req.user.sub) {
      return res.status(403).json({ message: "Forbidden" });
    }

    opportunity.title = req.body.title || opportunity.title;
    opportunity.value = req.body.value ?? opportunity.value;
    opportunity.stage = req.body.stage || opportunity.stage;

    const updated = await opportunity.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// DELETE /api/opportunities/:id
export const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) return res.status(404).json({ message: "Not found" });

    if (req.user.role === "rep" && opportunity.ownerId.toString() !== req.user.sub) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await opportunity.deleteOne();
    res.json({ message: "Opportunity deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
