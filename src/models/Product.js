const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true,
    },
    sku: {
        type: String,
        required: [true, 'Please add a SKU'],
        unique: true,
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
    },
    stock: {
        type: Number,
        required: [true, 'Please add stock quantity'],
        default: 0,
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
    },
    image: {
        type: String, // Will store Cloudinary URL
    },
    description: {
        type: String,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
