const mongoose = require('mongoose');

const TourPackageSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  nameKey: { type: String, required: true },
  descriptionKey: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  durationKey: { type: String, required: true },
});

module.exports = mongoose.model('TourPackage', TourPackageSchema);