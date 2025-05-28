"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_js_1 = __importDefault(require("../config/db.js"));
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    let featured = req.query['featured'] == 'true' ? true : false;
    let search = req.query['search'] || null;
    let limit = parseInt(req.query['limit']) || 20;
    limit = Math.min(limit, 100);
    const query = {
        include: {
            category: true
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: limit
    };
    if (featured == true) {
        query.where = {
            featured: true
        };
    }
    if (search) {
        query.where = {
            OR: [
                {
                    name: {
                        search: search
                    }
                },
                {
                    description: {
                        search: search
                    }
                },
                {
                    category: {
                        name: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    }
                }
            ]
        };
        query.orderBy = {
            _relevance: {
                fields: ['name', 'description'],
                search: search,
                sort: 'desc'
            }
        };
    }
    const products = await db_js_1.default.product.findMany(query);
    res.send(products);
});
router.post('/', async (req, res) => {
    if (!req.body.name || !req.body.price || isNaN(req.body.price) || req.body.price <= 0 || !req.body.description || !req.body.image) {
        return res.status(400).send({ error: 'Name, price, description, and image are required' });
    }
    const { name, price, categoryId, description, image } = req.body;
    const product = await db_js_1.default.product.create({
        data: {
            name,
            price,
            categoryId: categoryId || null,
            description,
            image,
        }
    });
    res.status(201).send(product);
});
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).send({ error: 'Invalid product ID' });
    }
    try {
        const product = await db_js_1.default.product.findUnique({
            where: { id },
            include: {
                category: true
            }
        });
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        return res.send(product);
    }
    catch (error) {
        return res.status(500).send({ error: 'Internal server error' });
    }
});
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).send({ error: 'Invalid product ID' });
    }
    try {
        const product = await db_js_1.default.product.findUnique({
            where: { id }
        });
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        const name = req.body.name || product.name;
        const price = parseFloat(req.body.price) || product.price;
        const updatedProduct = await db_js_1.default.product.update({
            where: { id },
            data: { name, price }
        });
        return res.send(updatedProduct);
    }
    catch (error) {
        return res.status(500).send({ error: 'Internal server error' });
    }
});
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).send({ error: 'Invalid product ID' });
    }
    try {
        const product = await db_js_1.default.product.findUnique({
            where: { id }
        });
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        await db_js_1.default.product.delete({
            where: { id }
        });
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).send({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=product.js.map