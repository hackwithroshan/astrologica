const mongoose = require('mongoose');

const ItineraryDaySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  titleKey: { type: String, required: true },
  descriptionKey: { type: String, required: true },
});

const TourPackageSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  nameKey: { type: String, required: true },
  locationKey: { type: String, required: true }, // For search
  deityKey: { type: String, required: true }, // For search
  descriptionKey: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  durationKey: { type: String, required: true },
  gallery: [String],
  itinerary: [ItineraryDaySchema],
  accommodationKey: { type: String, required: true },
  transportKey: { type: String, required: true },
  mealsKey: { type: String, required: true },
  inclusions: [String],
  exclusions: [String],
  cancellationPolicyKey: { type: String, required: true },
  bestTimeToVisitKey: { type: String },
});

module.exports = mongoose.model('TourPackage', TourPackageSchema);