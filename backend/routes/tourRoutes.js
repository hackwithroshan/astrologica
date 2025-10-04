const express = require('express');
const {
  getTourPackages,
  addTourPackage,
  updateTourPackage,
  deleteTourPackage,
} = require('../controllers/tourController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getTourPackages);

// Admin-only routes
router.use(protect);
router.use(authorize('admin'));

router.route('/').post(addTourPackage);
router.route('/:id').put(updateTourPackage).delete(deleteTourPackage);

module.exports = router;
