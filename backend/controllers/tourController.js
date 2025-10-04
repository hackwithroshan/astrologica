const TourPackage = require('../models/TourPackage');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all tour packages
// @route     GET /api/tours
// @access    Public
exports.getTourPackages = asyncHandler(async (req, res, next) => {
  const tours = await TourPackage.find();
  res.status(200).json({ success: true, count: tours.length, data: tours });
});

// @desc      Add a tour package
// @route     POST /api/tours
// @access    Private/Admin
exports.addTourPackage = asyncHandler(async (req, res, next) => {
    const lastTour = await TourPackage.findOne().sort({ id: -1 });
    const nextId = lastTour ? lastTour.id + 1 : 1;
    const tourData = { ...req.body, id: nextId };
    const tour = await TourPackage.create(tourData);
    res.status(201).json({ success: true, data: tour });
});

// @desc      Update a tour package
// @route     PUT /api/tours/:id
// @access    Private/Admin
exports.updateTourPackage = asyncHandler(async (req, res, next) => {
    let tour = await TourPackage.findOne({ id: req.params.id });
    if (!tour) {
        return next(new ErrorResponse(`Tour package not found with id of ${req.params.id}`, 404));
    }
    tour = await TourPackage.findOneAndUpdate({ id: req.params.id }, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: tour });
});

// @desc      Delete a tour package
// @route     DELETE /api/tours/:id
// @access    Private/Admin
exports.deleteTourPackage = asyncHandler(async (req, res, next) => {
    const tour = await TourPackage.findOne({ id: req.params.id });
    if (!tour) {
        return next(new ErrorResponse(`Tour package not found with id of ${req.params.id}`, 404));
    }
    await tour.deleteOne();
    res.status(200).json({ success: true, data: {} });
});
