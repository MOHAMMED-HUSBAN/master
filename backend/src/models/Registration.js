const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  program: { type: mongoose.Schema.Types.ObjectId, ref: 'WhatWeOffer2', required: true },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Registration = mongoose.model("Registration", registrationSchema);
module.exports = Registration;