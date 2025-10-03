
const express = require('express');
const { createSubscription, getUserSubscriptions, getAllSubscriptions, cancelSubscription } = require('../controllers/subscriptionController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/').post(createSubscription);
router.route('/my-subscriptions').get(getUserSubscriptions);

// Admin routes
router.route('/all').get(authorize('admin'), getAllSubscriptions);
// Route uses transaction ID, which is stored in the `id` field.
router.route('/:id/cancel').put(authorize('admin'), cancelSubscription);

module.exports = router;
