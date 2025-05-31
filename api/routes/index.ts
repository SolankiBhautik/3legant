import express from 'express';
import productsRouter from './product.js';
import categoriesRouter from './category.js';

const router = express.Router();

router.use('/api/products', productsRouter);
router.use('/api/categories', categoriesRouter);

export default router;