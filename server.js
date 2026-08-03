const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory user database
const registeredUsers = [];

// 1. Signup Route
app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = registeredUsers.find(u => u.email === normalizedEmail);

  if (existingUser) {
    return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
  }

  const newUser = { 
    name: name.trim(), 
    email: normalizedEmail, 
    password: password.toString() 
  };
  
  registeredUsers.push(newUser);

  res.json({
    success: true,
    user: { name: newUser.name, email: newUser.email }
  });
});

// 2. Login Route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = registeredUsers.find(u => u.email === normalizedEmail);

  if (!user) {
    return res.status(400).json({ success: false, message: "This email isn't registered yet." });
  }
  if (user.password !== password.toString()) {
    return res.status(400).json({ success: false, message: 'Incorrect password.' });
  }

  res.json({
    success: true,
    user: { name: user.name, email: user.email }
  });
});

// 3. Symptom Prediction Route
app.post('/api/predict', (req, res) => {
  const { symptoms } = req.body;
  
  if (!symptoms || symptoms.length === 0) {
    return res.status(400).json({ success: false, message: 'No symptoms provided' });
  }

  let predictionName = "Viral Infection / Flu";
  let adviceText = "Rest well, stay hydrated, and monitor your symptoms.";

  if (symptoms.includes("chestpain") && symptoms.includes("shortbreath")) {
    predictionName = "Emergency Cardiac Assessment Needed";
    adviceText = "Seek emergency medical care immediately — do not delay!";
  } else if (symptoms.includes("fever") && symptoms.includes("bodyache")) {
    predictionName = "Viral Fever";
    adviceText = "Monitor your temperature, rest, and drink plenty of fluids.";
  }

  res.json({
    success: true,
    prediction: predictionName,
    description: "Evaluated securely through your Node.js backend server.",
    advice: adviceText
  });
});

app.get('/', (req, res) => {
  res.send('AI Medical Assistant Backend is running successfully!');
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});