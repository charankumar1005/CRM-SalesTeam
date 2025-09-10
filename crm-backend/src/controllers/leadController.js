import Lead from "../models/Lead.js";
import Opportunity from "../models/Opportunity.js";

// GET /api/leads
export const getLeads = async (req, res) => {
  try {
    let leads;
    if (req.user.role === "manager") {
      leads = await Lead.find();
    } else {
      leads = await Lead.find({ ownerId: req.user.sub });
    }
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/leads/:id/convert
export const convertLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    // ✅ Carry over the value from the Lead
    const opportunity = await Opportunity.create({
      title: `${lead.name} – First Deal`,
      value: lead.value,   // 👈 use lead’s value
      stage: "Discovery",
      leadId: lead._id,
      ownerId: req.user.sub,
    });

    lead.status = "Qualified";
    await lead.save();

    res.status(201).json(opportunity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// POST /api/leads
export const createLead = async (req, res) => {
  try {
    const { name, email, mobile,value } = req.body;
    const lead = await Lead.create({
      name,
      email,
      mobile,
      value,
      ownerId: req.user.sub,
    });
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/leads/:id
export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    if (req.user.role === "rep" && lead.ownerId.toString() !== req.user.sub) {
      return res.status(403).json({ message: "Forbidden" });
    }

    lead.name = req.body.name || lead.name;
    lead.email = req.body.email || lead.email;
    lead.value = req.body.value || lead.value;
    lead.mobile = req.body.mobile || lead.mobile;
    lead.status = req.body.status || lead.status;

    const updated = await lead.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/leads/:id
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    if (req.user.role === "rep" && lead.ownerId.toString() !== req.user.sub) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await lead.deleteOne();
    res.json({ message: "Lead deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
