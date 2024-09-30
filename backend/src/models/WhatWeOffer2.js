// src/models/Program.js
const mongoose = require('mongoose');

const WhatWeOffer2Schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

const WhatWeOffer2 = mongoose.model('WhatWeOffer2', WhatWeOffer2Schema);
module.exports = WhatWeOffer2;
