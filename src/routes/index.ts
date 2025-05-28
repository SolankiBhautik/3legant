import express from 'express';
import productsRouter from './product.js';

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello, World!");
});

router.use('/api/products', productsRouter);

export default router;