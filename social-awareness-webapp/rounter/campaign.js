const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const User = require('../models/User');

// Middleware: kiểm tra role
function authRole(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
}

// User / Business Owner tạo campaign
router.post('/create', async (req, res) => {
  const { title, description, userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== 'user' && user.role !== 'business_owner') {
      return res.status(403).json({ message: "Only users or business owners can create campaigns" });
    }

    const newCampaign = new Campaign({
      title,
      description,
      createdBy: user._id
    });

    await newCampaign.save();
    res.status(201).json({ message: "Campaign created successfully", campaign: newCampaign });

  } catch (err) {
    console.error("Campaign creation error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin approve campaign
router.put('/approve/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    campaign.status = 'approved';
    await campaign.save();

    res.json({ message: "Campaign approved", campaign });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Lấy tất cả campaigns (user xem được)
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate('createdBy', 'username role');
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

