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

router.post('/', upload.single('image'), createProduct);
router.put('/:id', upload.single('image'), updateProduct);

module.exports = router;
