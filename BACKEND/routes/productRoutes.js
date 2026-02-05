import express from 'express';
import uploadCLoud from '../config/cloudinary.js';
import {protect, admin} from '../middlewares/authMiddleware.js'
import { createProduct, getProductById, getProducts, deleteProduct, editProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);//para traer un producto por el id


// DEBE DECIR: uploadCloud.single('image')
router.post('/', protect, admin, uploadCLoud.single('image'), (err, req, res, next) => {
  if (err) {
    console.error('Multer error:', err);
    return res.status(400).json({ message: err.message || 'File upload error' });
  }
  next();
}, createProduct);// para crear un producto nuevo

router.put('/:id', protect, admin, uploadCLoud.single('image'), (err, req, res, next) => {
  if (err) {
    console.error('Multer error in edit:', err);
    return res.status(400).json({ message: err.message || 'File upload error' });
  }
  next();
}, editProduct);// para editar un producto
router.delete('/:id', protect, admin, deleteProduct);//para eliminar un producto

export default router;