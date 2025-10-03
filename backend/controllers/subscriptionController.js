
const Subscription = require('../models/Subscription');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Create new subscription
// @route     POST /api/subscriptions
// @access    Private
exports.createSubscription = asyncHandler(async (req, res, next) => {
  req.body.userId = req.user.id;
  
  // Calculate next delivery date (e.g., 7 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  req.body.nextDeliveryDate = deliveryDate.toISOString().split('T')[0];

  const { id, userId, templeNameKey, prasadNameKey, frequency, price, fullName, phoneNumber, address, nextDeliveryDate } = req.body;
  
  const subscription = await Subscription.create({
    id,
    userId,
    templeNameKey,
    prasadNameKey,
    frequency,
    price,
    fullName,
    phoneNumber,
    address,
    nextDeliveryDate
  });

  res.status(201).json({
    success: true,
    data: subscription,
  });
});

// @desc      Get all subscriptions for a user
// @route     GET /api/subscriptions/my-subscriptions
// @access    Private
exports.getUserSubscriptions = asyncHandler(async (req, res, next) => {
  const subscriptions = await Subscription.find({ userId: req.user.id });

  res.status(200).json({
    success: true,
    count: subscriptions.length,
    data: subscriptions,
  });
});

// @desc      Get all subscriptions (Admin)
// @route     GET /api/subscriptions/all
// @access    Private/Admin
exports.getAllSubscriptions = asyncHandler(async (req, res, next) => {
  const subscriptions = await Subscription.find().populate('userId', 'name email').sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: subscriptions.length, data: subscriptions });
});

// @desc      Cancel a subscription (Admin)
// @route     PUT /api/subscriptions/:id/cancel
// @access    Private/Admin
exports.cancelSubscription = asyncHandler(async (req, res, next) => {
  // Use the main `id` field which is the transactionId, not the mongo `_id`
  const subscription = await Subscription.findOne({ id: req.params.id });
  if (!subscription) {
    return next(new ErrorResponse(`Subscription not found with id of ${req.params.id}`, 404));
  }
  subscription.status = 'Cancelled';
  await subscription.save();
  res.status(200).json({ success: true, data: subscription });
});