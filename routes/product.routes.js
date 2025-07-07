const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.controller');
const auth = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/role.middleware');

// Public - view products
router.get('/', productCtrl.getAllProducts);
router.get('/:id', productCtrl.getProductById);

// Admin - manage products
router.post('/', auth, checkRole("admin"), productCtrl.createProduct);
router.put('/:id', auth, checkRole("admin"), productCtrl.updateProduct);
router.delete('/:id', auth, checkRole("admin"), productCtrl.deleteProduct);

module.exports = router;
