const Cart = require('../models/cart.model');
const Order = require('../models/order.model');
const Product = require('../models/product.model');

// Place Order
exports.placeOrder = async (req, res) => {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    const items = cart.items.map(item => {
        total += item.product.price * item.quantity;
        return {
            product: item.product._id,
            quantity: item.quantity
        };
    });

    const order = new Order({
        user: userId,
        items,
        totalAmount: total
    });

    await order.save();
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order });
};

// Get User Orders
exports.getUserOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user.id }).populate('items.product');
    res.json(orders);
};

// Admin: Get All Orders
exports.getAllOrders = async (req, res) => {
    const orders = await Order.find().populate('user').populate('items.product');
    res.json(orders);
};
