
const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // تأكد من أن البريد الإلكتروني فريد
  phone: { type: String, required: true, unique: true }, // تأكد من أن رقم الهاتف فريد
  program: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },

}, { timestamps: true });

const Registration = mongoose.model("Registration", registrationSchema);
module.exports = Registration;
