require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const programRoutes = require('./src/routes/programRoutes');
const newsRoutes = require('./src/routes/newsRoutes');
const offeringRoutes=require('./src/routes/offeringRoutes');
const WhatWeOffer2Routes=require('./src/routes/WhatWeOffer2Routes');
const registrationRoutes = require('./src/routes/registrationRoutes');
const authRoutes = require('./src/routes/authRoutes');
const profileRoutes = require('./src/routes/profile');

const app = express();

// Middleware to parse JSON (must come before routes)
app.use(express.json());

// CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", 'x-auth-token'],
    credentials: true,
  })
);
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// MongoDB connection URI
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// API routes
app.use('/api/programs', programRoutes);
app.use('/api', newsRoutes);
app.use('/api', offeringRoutes);
app.use('/api', WhatWeOffer2Routes);
app.use('/api', registrationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);







// Sample route
app.get("/", (req, res) => {
  res.send("Welcome to the Taekwondo Academy API!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
