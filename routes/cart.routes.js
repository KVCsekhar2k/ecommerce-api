const express = require('express');
const router = express.Router();
const cartCtrl = require('../controllers/cart.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/', auth, cartCtrl.getCart);
router.post('/add', auth, cartCtrl.addToCart);
router.put('/update', auth, cartCtrl.updateItem);
router.delete('/remove', auth, cartCtrl.removeItem);

module.exports = router;
