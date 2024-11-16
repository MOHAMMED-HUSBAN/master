require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const programRoutes = require('./src/routes/programRoutes');
const newsRoutes = require('./src/routes/newsRoutes');
const offeringRoutes = require('./src/routes/offeringRoutes');
const WhatWeOffer2Routes = require('./src/routes/WhatWeOffer2Routes');
const registrationRoutes = require('./src/routes/registrationRoutes');
const authRoutes = require('./src/routes/authRoutes');
const profileRoutes = require('./src/routes/profile');
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const contactRoutes = require('./src/routes/contactRoutes');

const subscriptionRoutes = require('./src/routes/subscriptionRoutes');
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
  credentials: true,
}));

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

// Routes
app.use('/api/programs', programRoutes);
app.use('/api', newsRoutes);
app.use('/api', offeringRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/programs', profileRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/WhatWeOffer2', WhatWeOffer2Routes);
app.use('/api/contact', contactRoutes);

// Sample route
app.get("/", (req, res) => {
  res.send("Welcome to the Taekwondo Academy API!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});