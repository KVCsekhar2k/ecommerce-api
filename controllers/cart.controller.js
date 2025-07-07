const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

// Get User Cart
exports.getCart = async (req, res) => {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    res.json(cart || { items: [] });
};

// Add Item to Cart
exports.addToCart = async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = new Cart({ user: userId, items: [] });

    const index = cart.items.findIndex(item => item.product.toString() === productId);

    if (index > -1) {
        cart.items[index].quantity += quantity;
    } else {
        cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.json(cart);
};

// Update Quantity
exports.updateItem = async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(item => item.product.toString() === productId);
    if (item) item.quantity = quantity;

    await cart.save();
    res.json(cart);
};

// Remove Item
exports.removeItem = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
    res.json(cart);
};
