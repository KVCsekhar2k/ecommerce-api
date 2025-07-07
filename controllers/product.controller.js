const Product = require('../models/product.model');

// Create Product (Admin)
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get All Products (Pagination + Search)
exports.getAllProducts = async (req, res) => {
    const { page = 1, limit = 5, search = "" } = req.query;
    const query = {
        $or: [
            { name: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } }
        ]
    };
    try {
        const products = await Product.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));
        const total = await Product.countDocuments(query);
        res.json({ products, totalPages: Math.ceil(total / limit), currentPage: Number(page) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get Product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update Product (Admin)
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete Product (Admin)
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
