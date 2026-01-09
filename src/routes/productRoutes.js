const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { uploadImage } = require('../middleware/uploadMiddleware');


router.use(protect);

router.route('/')
    .get(getProducts)
    .post(uploadImage, createProduct);

router.route('/:id')
    .get(getProductById)
    .put(uploadImage, updateProduct)
    .delete(deleteProduct);

module.exports = router;
