const express = require('express');
const router = express.Router();

router.post('/predict', (req, res) => {
  const { symptoms } = req.body;
  
  if (!symptoms || symptoms.length === 0) {
    return res.status(400).json({ success: false, message: 'No symptoms provided' });
  }

  // Simple backend evaluation logic
  let predictionName = "Viral Infection / Flu";
  let adviceText = "Rest well, drink warm fluids, and take prescribed medicine.";

  if (symptoms.includes("chestpain") && symptoms.includes("shortbreath")) {
    predictionName = "Emergency Cardiac Assessment Needed";
    adviceText = "Seek emergency medical care immediately!";
  } else if (symptoms.includes("fever") && symptoms.includes("bodyache")) {
    predictionName = "Viral Fever";
    adviceText = "Monitor your temperature and stay hydrated.";
  }

  res.json({
    success: true,
    prediction: predictionName,
    description: "Evaluated securely through Node.js backend API.",
    advice: adviceText
  });
});

module.exports = router;