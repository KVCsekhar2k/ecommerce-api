const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/order.controller');
const auth = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/role.middleware');

// Customer
router.post('/place', auth, orderCtrl.placeOrder);
router.get('/my', auth, orderCtrl.getUserOrders);

// Admin
router.get('/all', auth, checkRole("admin"), orderCtrl.getAllOrders);

module.exports = router;
