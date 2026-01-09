const Product = require('../models/Product');
const { uploadToCloudinary } = require('../middleware/uploadMiddleware');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
    const { name, sku, category, stock, price, description } = req.body;

    try {
        const skuExists = await Product.findOne({ sku });
        if (skuExists) {
            return res.status(400).json({ message: 'SKU already exists' });
        }

        let imageUrl = '';
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            imageUrl = result.secure_url;
        }

        const product = new Product({
            name,
            sku,
            category,
            stock,
            price,
            description,
            image: imageUrl,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    const { name, sku, category, stock, price, description } = req.body;

    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            if (req.file) {
                const result = await uploadToCloudinary(req.file.buffer);
                product.image = result.secure_url;
            }

            product.name = name || product.name;
            product.sku = sku || product.sku;
            product.category = category || product.category;
            product.stock = stock !== undefined ? stock : product.stock;
            product.price = price !== undefined ? price : product.price;
            product.description = description || product.description;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await Product.findByIdAndDelete(req.params.id);
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
